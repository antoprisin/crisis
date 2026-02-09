import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ArrowRight, Heart, Shield, Activity } from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';

const HEALTHCARE_KB = {
    "first_aid": {
        "bleeding": "Apply firm, steady pressure with a clean cloth. Elevate the wound. Seek medical help if bleeding doesn't stop.",
        "burns": "Run cool (not cold) water over the burn for 10-20 mins. Do not use ice or butter. Cover loosely with sterile dressing.",
        "choking": "Perform the Heimlich maneuver. For infants, use back blows and chest thrusts.",
        "fracture": "Immobilize the limb. Do not try to realign. Apply ice to reduce swelling."
    },
    "blood": {
        "donating": "Must be 18-65 yrs, weigh >45kg, and have no major illness. O- is the universal donor.",
        "receiving": "O+ can receive from O+, O-. AB+ can receive from all groups (Universal Recipient)."
    },
    "cpr": "Push hard and fast in the center of the chest (100-120 bpm). Use the rhythm of 'Stayin' Alive'.",
    "emergency": "For life-threatening situations, use the SOS button. Call 108 (Medical) or 100 (Police)."
};

const getLocalResponse = (query) => {
    const q = query.toLowerCase();

    // Emergency & CPR
    if (q.includes('cpr') || q.includes('heart attack') || q.includes('cardiac')) return HEALTHCARE_KB.cpr;
    if (q.includes('emergency') || q.includes('sos') || q.includes('ambulance') || q.includes('help')) return HEALTHCARE_KB.emergency;

    // First Aid
    if (q.includes('bleed') || q.includes('cut') || q.includes('wound')) return HEALTHCARE_KB.first_aid.bleeding;
    if (q.includes('burn') || q.includes('fire') || q.includes('scald')) return HEALTHCARE_KB.first_aid.burns;
    if (q.includes('chok') || q.includes('stuck')) return HEALTHCARE_KB.first_aid.choking;
    if (q.includes('fracture') || q.includes('broken') || q.includes('bone')) return HEALTHCARE_KB.first_aid.fracture;

    // Blood
    if (q.includes('donat')) return HEALTHCARE_KB.blood.donating;
    if (q.includes('receiv') || q.includes('transfusion') || q.includes('type')) return HEALTHCARE_KB.blood.receiving;

    return null;
};

const AIChatbot = () => {
    const { user, resources, activeRequests, emergencyLevel } = useCrisis();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: `Crisis AI v4.2 Online. Knowledge base loaded with Healthcare & First-Aid protocols. How can I help?` }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const truncateResources = (res) => {
            if (!res) return {};
            const truncated = {};
            Object.keys(res).forEach(key => {
                if (Array.isArray(res[key])) {
                    truncated[key] = res[key].slice(0, 5).map(item => ({
                        name: item.name,
                        location: item.location,
                        type: item.type,
                        status: item.status
                    }));
                }
            });
            return truncated;
        };

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: input,
                    context: {
                        user: { username: user?.username || 'Guest' },
                        resources: truncateResources(resources),
                        emergencyLevel
                    }
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to connect to AI');

            const query = input.toLowerCase();
            let action = null;

            // Optional: Maintain some hardcoded navigation logic if AI doesn't suggest it explicitly
            if (query.includes('blood') || query.includes('map')) {
                action = { label: 'View Live Blood Map', path: '/map?filter=bloodBanks' };
            } else if (query.includes('food')) {
                action = { label: 'View Food Map', path: '/food' };
            } else if (query.includes('doctor')) {
                action = { label: 'Consult Doctors', path: '/doctors' };
            }

            setMessages(prev => [...prev, { role: 'bot', text: data.response, action }]);
        } catch (err) {
            console.error('Chat Error:', err);
            const localResponse = getLocalResponse(input);
            const fallbackMessage = localResponse
                ? `⚠️ [OFFLINE MODE] Neural Matrix disconnected.\n\nManual Protocol: ${localResponse}`
                : "I'm having trouble connecting to my neural matrix. Please check your connection or use specific keywords like 'CPR', 'Bleeding', or 'Burns' for manual protocols.";

            setMessages(prev => [...prev, {
                role: 'bot',
                text: fallbackMessage
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const suggestions = [
        "First Aid for Bleeding", "Nearest Food Point", "How to give CPR", "Check Shelter Slots"
    ];

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="glass-card"
                        style={{ width: '400px', height: '600px', marginBottom: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                        <div style={{ padding: '24px', background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px', borderRadius: '14px' }}><Bot size={24} /></div>
                                <div>
                                    <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>Medical AI Assistant</h4>
                                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}><Activity size={10} style={{ display: 'inline', marginRight: '4px' }} /> Healthcare Knowledge Loaded</span>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px', borderRadius: '50%' }}><X size={18} /></button>
                        </div>

                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', background: 'var(--glass-bg)' }}>
                            {messages.map((m, idx) => (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={idx}
                                    style={{
                                        alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%', padding: '14px 18px', borderRadius: '18px', fontSize: '0.9rem',
                                        background: m.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        border: m.role === 'user' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                                        color: m.role === 'user' ? 'white' : 'var(--text)', borderBottomRightRadius: m.role === 'user' ? '4px' : '18px', borderBottomLeftRadius: m.role === 'bot' ? '4px' : '18px',
                                    }}
                                >
                                    {m.text}
                                    {m.action && (
                                        <button onClick={() => { navigate(m.action.path); setIsOpen(false); }} className="btn-outline" style={{ marginTop: '12px', width: '100%', padding: '8px', fontSize: '0.8rem', borderRadius: '8px', fontWeight: 800 }}>
                                            {m.action.label} <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: '18px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <Loader2 size={16} className="animate-spin" /> <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Retrieving Medical KB...</span>
                            </div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="no-scrollbar" style={{ padding: '12px 16px', background: 'var(--glass-bg)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
                            {suggestions.map((s, idx) => (
                                <button key={idx} onClick={() => setInput(s)} style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>{s}</button>
                            ))}
                        </div>

                        <div style={{ padding: '20px', background: 'var(--background)', display: 'flex', gap: '12px', borderTop: '1px solid var(--glass-border)' }}>
                            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask for First Aid or aid points..." style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', padding: '12px 16px', fontSize: '0.9rem', outline: 'none' }} />
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleSend} className="btn-primary" style={{ padding: '12px', borderRadius: '12px' }}><Send size={20} /></motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(!isOpen)}
                style={{ width: '64px', height: '64px', borderRadius: '22px', background: 'linear-gradient(135deg, var(--primary) 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4)', color: 'white' }}
            >
                {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
                <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--accent)', borderRadius: '50%', padding: '6px', border: '3px solid #020617' }}><Sparkles size={14} /></div>
            </motion.button>
        </div>
    );
};

export default AIChatbot;
