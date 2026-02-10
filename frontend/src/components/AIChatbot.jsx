import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ArrowRight, Heart, Shield, Activity } from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';

const HEALTHCARE_KB = {
    "first_aid": {
        "bleeding": "Apply firm, steady pressure with a clean cloth. Elevate the wound if possible. Seek medical help if bleeding doesn't stop.",
        "burns": "Run cool (not cold) water over the burn for 10-20 mins. Do not use ice, butter, or oil. Cover loosely with sterile, non-stick dressing.",
        "choking": "Perform the Heimlich maneuver (abdominal thrusts). For infants, use back blows and chest thrusts. Call emergency services immediately.",
        "fracture": "Immobilize the injured limb using a splint or sling. Do not try to realign the bone. Apply ice packs wrapped in cloth to reduce swelling.",
        "snake_bite": "Keep the patient calm and still. Immobilize the bitten limb. Do NOT cut the wound or suck out venom. Transport to hospital immediately.",
        "heart_attack": "Call emergency services. Have the person sit down and rest. If they are not allergic, give them an aspirin to chew. Begin CPR if they become unconscious."
    },
    "symptoms": {
        "fever": "Rest and stay hydrated. Take paracetamol if uncomfortable. Seek medical attention if fever exceeds 103°F (39.4°C) or lasts more than 3 days.",
        "headache": "Rest in a quiet, dark room. Hydrate with water. OTC pain relievers like paracetamol or ibuprofen may help. Seek help if headache is sudden and severe.",
        "dehydration": "Drink oral rehydration solutions (ORS), water, or clear broths. Avoid caffeine and alcohol. Seek help if unable to keep fluids down."
    },
    "medicines": {
        "diabetes": "We offer Accu-Chek strips, Metformin, and Insulin Glargine. Check the 'Medicines > Diabetes Care' section for stock.",
        "ayurveda": "Our Ayurveda range includes Ashwagandha, Chyawanprash, and Triphala. Visit 'Medicines > Ayurveda' for details.",
        "homeopathy": "Available remedies include Arnica Montana, Nux Vomica, and Arsenicum Album. See 'Medicines > Homeopathy'."
    },
    "blood": {
        "donating": "Donors must be 18-65 years, weight >45kg, and generally healthy. Men can donate every 3 months, women every 4 months.",
        "receiving": "O- is the universal donor for RBCs. AB+ is the universal recipient. Always match blood types for safety.",
        "compatibility": "A+ -> A+, AB+; O+ -> O+, A+, B+, AB+; B+ -> B+, AB+; AB+ -> AB+ only (plasma universal donor)."
    },
    "app_features": {
        "track": "You can track active units on the 'Global Map'. Click 'Track Unit' on any active request card in your dashboard.",
        "request": "To request blood or oxygen, go to the 'Request' tab, fill the form, and your SOS will be broadcast to nearby resources.",
        "map": "The Global Map shows real-time locations of Blood Banks, Ambulances, and active SOS signals. Use filters to narrow your search."
    },
    "cpr": "Hands-only CPR: Push hard and fast in the center of the chest (100-120 compressions/minute). Sync to the beat of 'Stayin' Alive'. Continue until help arrives.",
    "emergency": "For immediate life-threatening emergencies, press the red SOS button in the header. Ambulance: 102/108, Police: 100."
};

const getLocalResponse = (query) => {
    const q = query.toLowerCase();

    // Emergency & CPR
    if (q.includes('cpr') || q.includes('cardiac') || q.includes('unconscious')) return HEALTHCARE_KB.cpr;
    if (q.includes('snake') || q.includes('bite')) return HEALTHCARE_KB.first_aid.snake_bite;
    if (q.includes('heart attack') || q.includes('chest pain')) return HEALTHCARE_KB.first_aid.heart_attack;
    if (q.includes('emergency') || q.includes('sos') || q.includes('help') || q.includes('ambulance') || q.includes('police')) return HEALTHCARE_KB.emergency;

    // First Aid
    if (q.includes('bleed') || q.includes('cut') || q.includes('wound') || q.includes('hemorrhage')) return HEALTHCARE_KB.first_aid.bleeding;
    if (q.includes('burn') || q.includes('fire') || q.includes('scald')) return HEALTHCARE_KB.first_aid.burns;
    if (q.includes('chok') || q.includes('stuck') || q.includes('breath')) return HEALTHCARE_KB.first_aid.choking;
    if (q.includes('fracture') || q.includes('broke') || q.includes('bone')) return HEALTHCARE_KB.first_aid.fracture;

    // Symptoms
    if (q.includes('fever') || q.includes('temp') || q.includes('hot')) return HEALTHCARE_KB.symptoms.fever;
    if (q.includes('headache') || q.includes('migraine') || q.includes('head')) return HEALTHCARE_KB.symptoms.headache;
    if (q.includes('thirsty') || q.includes('dehydrat')) return HEALTHCARE_KB.symptoms.dehydration;

    // Medicines & Categories
    if (q.includes('diabetes') || q.includes('insulin') || q.includes('sugar')) return HEALTHCARE_KB.medicines.diabetes;
    if (q.includes('ayurveda') || q.includes('herbal') || q.includes('ashwagandha')) return HEALTHCARE_KB.medicines.ayurveda;
    if (q.includes('homeopathy') || q.includes('arnica')) return HEALTHCARE_KB.medicines.homeopathy;

    // Blood
    if (q.includes('donat') || q.includes('giving blood')) return HEALTHCARE_KB.blood.donating;
    if (q.includes('receiv') || q.includes('transfusion') || q.includes('compatibility')) return HEALTHCARE_KB.blood.receiving;
    if (q.includes('type') || q.includes('group')) return HEALTHCARE_KB.blood.compatibility;

    // App Features
    if (q.includes('track') || q.includes('location') || q.includes('where')) return HEALTHCARE_KB.app_features.track;
    if (q.includes('request') || q.includes('need') || q.includes('get')) return HEALTHCARE_KB.app_features.request;
    if (q.includes('map') || q.includes('view') || q.includes('pin')) return HEALTHCARE_KB.app_features.map;

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

        const originalInput = input; // Store input before clearing
        const userMsg = { role: 'user', text: originalInput };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate "Thinking" time for realism
        // await new Promise(r => setTimeout(r, 600));

        try {
            // Attempt to fetch from backend
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: originalInput,
                    context: {
                        user: { username: user?.username || 'Guest' },
                        resources: {}, // Minimized payload
                        emergencyLevel
                    }
                })
            });

            if (!response.ok) throw new Error('Backend offline');

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'bot', text: data.response }]);

        } catch (err) {
            // Fallback to sophisticated local logic
            console.warn('Switching to offline protocol:', err);

            setTimeout(() => {
                const localResponse = getLocalResponse(originalInput);
                let botResponse;

                if (localResponse) {
                    botResponse = {
                        role: 'bot',
                        text: `[OFFLINE PROTOCOL ACTIVE]\n\n${localResponse}`,
                        action: null // Add consistent logic for actions later if needed
                    };
                } else {
                    // Enhanced fallback for unknown queries
                    botResponse = {
                        role: 'bot',
                        text: "I'm currently operating on a local mesh network and can't access the global neural matrix. \n\nI can still assist with:\n• First Aid (CPR, Burns, Bleeding)\n• Resource Protocols (Donating Blood, Triage)\n• Emergency Contacts",
                    };
                }

                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 1000); // Small delay for effect
            return; // Exit early to avoid double setTyping(false)
        }

        setIsTyping(false);
    };

    const suggestions = [
        "First Aid for Bleeding", "How to give CPR", "Check Shelter Slots"
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
