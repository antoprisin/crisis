import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Check, X, ShieldCheck, Star, AlertTriangle, Activity, Zap } from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';

const RequestCard = ({ request, onAccept, onReject }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="glass-card"
        style={{
            padding: '32px',
            marginBottom: '24px',
            borderLeft: `8px solid ${request.priority.toLowerCase().includes('critical') || request.priority.toLowerCase().includes('immediate') ? '#ef4444' : '#f59e0b'}`,
            background: 'var(--glass-bg)'
        }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{
                        fontSize: '0.75rem',
                        background: request.priority.toLowerCase().includes('critical') || request.priority.toLowerCase().includes('immediate') ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: 'var(--text)',
                        padding: '6px 14px',
                        borderRadius: '50px',
                        fontWeight: 800,
                        letterSpacing: '0.5px'
                    }}>
                        {request.priority.toUpperCase()}
                    </span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} /> {new Date(request.timestamp || request.time).toLocaleTimeString()}
                    </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '12px' }}>{request.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.6 }}>{request.desc || `Urgent request for ${request.units || 'essential'} units. Propagated via Flooding Algorithm.`}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '24px', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)' }}>
                        <MapPin size={18} />
                        <span style={{ fontWeight: 700 }}>{request.location || 'Within 2.5 km'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#22c55e' }}>
                        <Activity size={18} />
                        <span style={{ fontWeight: 700 }}>Telemetry Verified</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px', marginLeft: '40px' }}>
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '1px', fontWeight: 700, marginBottom: '6px' }}>REQUESTER TRUST</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                        <Star size={18} fill="#f59e0b" color="#f59e0b" />
                        <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>{request.requesterRating || '4.9'}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onReject(request.id)}
                        className="btn-outline"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <X size={28} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onAccept(request.id)}
                        className="btn-primary"
                        style={{ width: '60px', height: '60px', borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#22c55e', boxShadow: '0 10px 20px rgba(34, 197, 94, 0.3)' }}
                    >
                        <Check size={28} />
                    </motion.button>
                </div>
            </div>
        </div>
    </motion.div>
);

const DonorDashboard = () => {
    const { activeRequests, addNotification } = useCrisis();
    const [localRequests, setLocalRequests] = useState([]);

    useEffect(() => {
        setLocalRequests(activeRequests);
    }, [activeRequests]);

    const handleAccept = (id) => {
        setLocalRequests(prev => prev.filter(r => r.id !== id));
        addNotification({ title: 'Task Accepted', message: 'Mission operational. Routing engine is pushing GPS telemetry to your HUD.', type: 'success' });
    };

    const handleReject = (id) => {
        setLocalRequests(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Donor Command Center</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Verified Identity: <span style={{ color: 'var(--text)', fontWeight: 700 }}>HERO-MESH-901</span></span>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ color: '#22c55e', fontWeight: 800, fontSize: '0.9rem' }}>READY FOR DEPLOYMENT</span>
                    </div>
                </div>
                <div className="glass-card" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px', background: 'rgba(59, 130, 246, 0.1)', borderColor: 'var(--accent)' }}>
                    <ShieldCheck size={28} color="var(--accent)" />
                    <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800 }}>AI CLEARANCE</div>
                        <div style={{ fontSize: '1rem', fontWeight: 800 }}>LEVEL 4 ACTIVE</div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
                <div>
                    <h2 style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                        High-Priority Stream
                        <span style={{ fontSize: '0.9rem', background: 'var(--primary)', padding: '4px 14px', borderRadius: '50px', color: 'white', fontWeight: 900 }}>{localRequests.length} ALERTS</span>
                    </h2>

                    <AnimatePresence>
                        {localRequests.map(req => (
                            <RequestCard key={req.id} request={req} onAccept={handleAccept} onReject={handleReject} />
                        ))}
                        {localRequests.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '100px 0', border: '2px dashed var(--glass-border)', borderRadius: '24px' }}>
                                <div style={{ position: 'relative', display: 'inline-block', marginBottom: '24px' }}>
                                    <Clock size={64} color="var(--text-muted)" style={{ opacity: 0.2 }} />
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Zap size={24} color="var(--primary)" className="animate-pulse" />
                                    </div>
                                </div>
                                <h3 style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Monitoring high-priority broadcast stream...</h3>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 800 }}>
                                    <Activity size={16} /> FLOODING PROTOCOL: LISTENING
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-card" style={{ padding: '32px' }}>
                        <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800 }}>Efficiency Metrics</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--glass-bg)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)' }}>12</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>LIVES AIDED</div>
                            </div>
                            <div className="glass-card" style={{ padding: '20px', textAlign: 'center', background: 'var(--glass-bg)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b' }}>4.9</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>AVG RATING</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '32px', background: 'var(--sidebar-bg)' }}>
                        <h3 style={{ fontWeight: 800 }}>System Telemetry</h3>
                        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Mesh Coverage</span>
                                <span style={{ color: '#22c55e', fontWeight: 700 }}>98.2%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Response Latency</span>
                                <span style={{ color: '#22c55e', fontWeight: 700 }}>{`< 5ms`}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Active Nodes</span>
                                <span style={{ color: 'var(--text)', fontWeight: 700 }}>1,204</span>
                            </div>
                        </div>
                        <button className="btn-outline" style={{ width: '100%', marginTop: '32px', fontWeight: 800, fontSize: '0.85rem' }}>SYNC LIVE HUD</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorDashboard;
