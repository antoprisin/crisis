import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Users, Globe, Zap, Cpu } from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { label: 'Active Donors', value: '1,240+', icon: <Users size={20} />, color: 'var(--primary)' },
        { label: 'Response Nodes', value: '450+', icon: <Globe size={20} />, color: '#3b82f6' },
        { label: 'Neural Uplinks', value: '99.9%', icon: <Zap size={20} />, color: '#22c55e' },
        { label: 'Decision Logic', value: 'v4.2', icon: <Cpu size={20} />, color: '#a855f7' }
    ];

    const values = [
        {
            title: 'Neural Response',
            desc: 'Our proprietary flooding algorithm ensures emergency requests reach the right hands in microseconds.',
            icon: <Zap size={24} />
        },
        {
            title: 'Identity Security',
            desc: 'Aadhar-linked biometric verification ensures every donor and recipient is verified and trusted.',
            icon: <Shield size={24} />
        },
        {
            title: 'Global Reach',
            desc: 'Bridging the gap between hospitals and heroes across entire geographical sectors.',
            icon: <Target size={24} />
        }
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '64px' }}
            >
                <div style={{
                    display: 'inline-flex',
                    padding: '12px',
                    background: 'rgba(220, 38, 38, 0.1)',
                    borderRadius: '20px',
                    color: 'var(--primary)',
                    marginBottom: '24px'
                }}>
                    <Shield size={48} />
                </div>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '16px' }}>Blood Link Protocol</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
                    The world's most advanced crisis response ecosystem, driven by high-frequency telemetry and autonomous logic.
                </p>
            </motion.div>

            <div className="grid-cols-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '64px' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ padding: '32px', textAlign: 'center' }}
                    >
                        <div style={{ color: stat.color, marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                            {stat.icon}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '4px' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '80px', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '24px' }}>Our Mission</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '32px' }}>
                        In critical moments, seconds save lives. Blood Link was engineered to eliminate the friction in healthcare logistics. By combining real-time spatial mapping with decentralized hero networks, we've created a system that doesn't just respond to crisis—it anticipates it.
                    </p>
                    <div className="glass-card" style={{ padding: '24px', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '6px solid #3b82f6' }}>
                        <p style={{ fontSize: '1rem', fontStyle: 'italic', color: 'var(--text)' }}>
                            "We are not just a platform; we are the neural architecture for survival."
                        </p>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card"
                    style={{ padding: '0', overflow: 'hidden', height: '400px', background: 'rgba(255,255,255,0.02)' }}
                >
                    <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop" alt="Medical Tech" style={{ width: '100%', height: '100%', objectFit: 'crop', opacity: 0.6 }} />
                </motion.div>
            </div>

            <div style={{ marginBottom: '64px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, textAlign: 'center', marginBottom: '48px' }}>Core System Values</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                    {values.map((v, i) => (
                        <div key={i} className="glass-card" style={{ padding: '40px' }}>
                            <div style={{ color: 'var(--primary)', marginBottom: '24px' }}>
                                {v.icon}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>{v.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
