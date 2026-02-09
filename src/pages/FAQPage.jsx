import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle, AlertTriangle, ShieldCheck, Heart } from 'lucide-react';

const FAQItem = ({ question, answer, icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="glass-card" style={{ marginBottom: '16px', border: isOpen ? '1px solid var(--primary)' : '1px solid var(--glass-border)', transition: 'all 0.3s' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '100%',
                    padding: '24px 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    color: 'var(--text)',
                    textAlign: 'left',
                    outline: 'none'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ color: isOpen ? 'var(--primary)' : 'var(--text-muted)' }}>
                        {icon}
                    </div>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{question}</span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={20} color={isOpen ? 'var(--primary)' : 'var(--text-muted)'} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 32px 32px 72px', color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '1rem' }}>
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQPage = () => {
    const faqs = [
        {
            icon: <ShieldCheck size={24} />,
            question: "Is my Aadhar data secure?",
            answer: "Absolutely. Blood Link uses end-to-end encryption with zero-knowledge proof for Aadhar verification. We only verify the identity via government gateways (UIDAI); we never store your biometric data on our servers."
        },
        {
            icon: <AlertTriangle size={24} />,
            question: "How does the SOS system work?",
            answer: "When you trigger SOS, our flooding algorithm identifies the nearest 50 certified elite donors within a 5km radius. They receive a high-priority neural notification on their devices with your precise GPS coordinates."
        },
        {
            icon: <Heart size={24} />,
            question: "Who can become a donor?",
            answer: "Any healthy individual between 18-65 years weighing more than 45kg can register. Upon registration, you will go through a quick digital health screening to ensure system integrity."
        },
        {
            icon: <MessageCircle size={24} />,
            question: "Can I communicate with the recipient?",
            answer: "Yes, our 'Secure Chat' protocol allows for encrypted communication between donors and recipients once a match is confirmed by the system's logic gate."
        },
        {
            icon: <HelpCircle size={24} />,
            question: "What is the Flooding Algorithm?",
            answer: "It is our proprietary routing logic that spreads emergency requests through the mesh network like ripples in water, ensuring that the critical resources are located and secured in the shortest possible time path."
        }
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px' }}>Terminal FAQ</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Knowledge base for system protocols and user operations.</p>
            </div>

            <div style={{ marginBottom: '64px' }}>
                {faqs.map((faq, i) => (
                    <FAQItem key={i} {...faq} />
                ))}
            </div>

            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', background: 'rgba(59, 130, 246, 0.03)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px' }}>Still need technical support?</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Our AI logic and human response team are available 24/7 for critical queries.</p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button className="btn-primary" style={{ padding: '14px 32px' }}>CONTACT PROTOCOL</button>
                    <button className="btn-outline" style={{ padding: '14px 32px' }}>SUPPORT DOCS</button>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
