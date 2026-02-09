import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, HeartPulse, AlertCircle, Phone, MessageCircle, Activity, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCrisis } from '../context/CrisisContext';

const FeatureCard = ({ title, icon, path, desc, color }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className="glass-card"
        style={{ padding: '32px', cursor: 'pointer', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
        <Link to={path} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 16px -4px ${color}30`
            }}>
                {React.cloneElement(icon, { size: 32 })}
            </div>
            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '12px' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px' }}>{desc}</p>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: color, fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                OPEN PORTAL <ChevronRight size={16} />
            </div>
        </Link>
    </motion.div>
);

const UserDashboard = () => {
    const { addNotification, activeRequests } = useCrisis();

    const triggerSOS = () => {
        addNotification({
            title: 'SOS INITIATED',
            message: 'Aadhar-linked rescue protocol active. Broadcasting to nearest 50 elite donors.',
            type: 'error'
        });
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Active Response Console</h1>
                        <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} /> LIVE MONITORING
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Emergency Status: <span style={{ color: '#ef4444', fontWeight: 900, letterSpacing: '1px' }}>HIGH PRIORITY (LEVEL 4)</span></p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerSOS}
                    style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #991b1b 100%)',
                        padding: '20px 48px',
                        borderRadius: '50px',
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        boxShadow: '0 15px 40px rgba(239, 68, 68, 0.5)',
                        border: '2px solid rgba(255,255,255,0.2)'
                    }}
                >
                    <AlertCircle size={32} />
                    <span>SEND SOS</span>
                </motion.button>
            </div>

            <div className="grid-cols-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                <FeatureCard
                    title="Volunteer Doctors"
                    icon={<Stethoscope />}
                    path="/doctors"
                    desc="Direct telemetry link to specialized trauma surgeons and physicians."
                    color="#3b82f6"
                />
                <FeatureCard
                    title="Medical Relief Hubs"
                    icon={<HeartPulse />}
                    path="/health-centers"
                    desc="Locate high-throughput health camps and temporary clinical nodes."
                    color="#ec4899"
                />
            </div>

            <div style={{ marginTop: '64px' }}>
                <h2 style={{ marginBottom: '32px', fontSize: '1.8rem', fontWeight: 900 }}>Incident Telemetry Stream</h2>
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    {activeRequests.length > 0 ? activeRequests.map((incident, i) => (
                        <div key={incident.id} style={{
                            padding: '24px 32px',
                            borderBottom: i === activeRequests.length - 1 ? 'none' : '1px solid var(--glass-border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: i === 0 ? 'rgba(59, 130, 246, 0.03)' : 'transparent'
                        }}>
                            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: incident.priority === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Activity size={24} color={incident.priority === 'Critical' ? '#ef4444' : '#3b82f6'} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Resource Request: {incident.title}</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px' }}>Location: {incident.location} • <span style={{ fontWeight: 700 }}>{new Date(incident.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{
                                    padding: '8px 16px',
                                    background: 'rgba(255,255,255,0.05)',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    color: incident.priority === 'Critical' ? '#ef4444' : 'var(--accent)',
                                    border: `1px solid ${incident.priority === 'Critical' ? 'rgba(239, 68, 68, 0.3)' : 'var(--glass-border)'}`
                                }}>
                                    {incident.priority.toUpperCase()}
                                </div>
                                <button className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>TRACK UNIT</button>
                            </div>
                        </div>
                    )) : (
                        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No active telemetry signals in this sector.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
