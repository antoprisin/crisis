import React from 'react';
import { motion } from 'framer-motion';
import { useCrisis } from '../context/CrisisContext';
import { User, Shield, MapPin, Calendar, Award, Activity, Heart, Droplet, Clock, Mail } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useCrisis();

    if (!user) return <div className="flex-center" style={{ height: '80vh' }}>No active session found.</div>;

    const isDonor = user.role === 'donor';

    const stats = isDonor ? [
        { label: 'Donations', value: '12', icon: <Droplet size={20} />, color: '#ef4444' },
        { label: 'Lives Saved', value: '45', icon: <Heart size={20} />, color: '#ec4899' },
        { label: 'Trust Score', value: '4.9', icon: <Shield size={20} />, color: '#22c55e' },
        { label: 'Response Rate', value: '98%', icon: <Activity size={20} />, color: '#3b82f6' }
    ] : [
        { label: 'Requests', value: '3', icon: <Activity size={20} />, color: '#f59e0b' },
        { label: 'Assistance Received', value: '5', icon: <Shield size={20} />, color: '#22c55e' },
        { label: 'Trust Score', value: '5.0', icon: <Award size={20} />, color: '#a855f7' },
        { label: 'Active Alerts', value: '0', icon: <Clock size={20} />, color: '#3b82f6' }
    ];

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ padding: '48px', position: 'relative', overflow: 'hidden' }}
            >
                {/* Profile Header Background Decor */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '300px',
                    height: '100%',
                    background: `linear-gradient(to left, ${isDonor ? 'rgba(239, 68, 68, 0.05)' : 'rgba(59, 130, 246, 0.05)'}, transparent)`,
                    zIndex: 0
                }} />

                <div style={{ display: 'flex', gap: '48px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '40px',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username || user.aadhar}`}
                                alt="Profile Avatar"
                                style={{ width: '100px', height: '100px' }}
                            />
                        </div>
                        <div style={{
                            position: 'absolute',
                            bottom: '-10px',
                            right: '-10px',
                            background: isDonor ? '#ef4444' : 'var(--accent)',
                            padding: '10px',
                            borderRadius: '15px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                            border: '3px solid #020617'
                        }}>
                            {isDonor ? <Award size={24} color="white" /> : <Shield size={24} color="white" />}
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>{user.username || (isDonor ? 'Verified Hero Node' : 'Citizen Terminal')}</h1>
                            <span style={{
                                background: isDonor ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                                color: isDonor ? '#ef4444' : '#22c55e',
                                padding: '6px 16px',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                {isDonor ? 'ELITE DONOR' : 'ID VERIFIED'}
                            </span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Mail size={18} /> {user.email || 'telemetry@bloodlink.gov'}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>TELEMETRY ID</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '2px' }}>
                                    {user.aadhar?.slice(0, 4)} **** {user.aadhar?.slice(-4)}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>CONTACT LINK</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{user.phone || '+91 0000 0000'}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>BIOMETRIC AGE</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{user.age || '--'} YRS</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>ESTABLISHED</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>FEB 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid-cols-auto" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '24px' }}>
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ padding: '24px', textAlign: 'center' }}
                    >
                        <div style={{ color: stat.color, marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                            {stat.icon}
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px', marginTop: '24px' }}>
                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Activity size={20} color="var(--primary)" /> RECENT LOGS
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { title: 'Neural Authentication', date: '2h ago', status: 'Success' },
                            { title: isDonor ? 'Blood Request Accepted' : 'Food Assistance Located', date: 'Yesterday', status: 'Completed' },
                            { title: 'Profile Telemetry Updated', date: '3 days ago', status: 'Synchronized' }
                        ].map((log, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{log.title}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{log.date}</div>
                                </div>
                                <div style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 900 }}>{log.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '24px' }}>DATA PERMISSIONS</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {['Location Link', 'Biometric Auth', 'Emergency Broadcast'].map((perm, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{perm}</span>
                                <div style={{ width: '40px', height: '20px', background: '#22c55e', borderRadius: '10px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', right: '2px', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-outline" style={{ width: '100%', marginTop: '32px', padding: '12px', fontSize: '0.85rem' }}>
                        MANAGE ENCRYPTION KEYS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
