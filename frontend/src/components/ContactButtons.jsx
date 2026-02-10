import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, X, MessageSquare, Headphones } from 'lucide-react';

const ContactButtons = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const contactOptions = [
        {
            id: 'call',
            icon: <Phone size={24} />,
            label: 'Emergency Call',
            color: '#ef4444',
            href: 'tel:+1234567890',
            description: 'Immediate response'
        },
        {
            id: 'whatsapp',
            icon: <MessageCircle size={24} />,
            label: 'WhatsApp Support',
            color: '#22c55e',
            href: 'https://wa.me/1234567890',
            description: 'Chat with our team'
        }
    ];

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '110px', zIndex: 999, display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-end', gap: '12px' }}>
            <AnimatePresence>
                {isExpanded && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '8px' }}>
                        {contactOptions.map((option, index) => (
                            <motion.a
                                key={option.id}
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '12px 20px',
                                    textDecoration: 'none',
                                    color: 'white',
                                    borderLeft: `4px solid ${option.color}`,
                                    minWidth: '220px'
                                }}
                                whileHover={{ scale: 1.05, background: 'rgba(255, 255, 255, 0.08)' }}
                            >
                                <div style={{
                                    background: `${option.color}20`,
                                    color: option.color,
                                    padding: '10px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {option.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>{option.label}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{option.description}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    background: 'var(--secondary)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    cursor: 'pointer'
                }}
            >
                {isExpanded ? <X size={28} /> : <Headphones size={28} />}
                {!isExpanded && (
                    <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '12px',
                        height: '12px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        border: '2px solid #020617'
                    }} />
                )}
            </motion.button>
        </div>
    );
};

export default ContactButtons;
