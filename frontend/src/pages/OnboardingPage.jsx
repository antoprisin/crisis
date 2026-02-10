import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrisis } from '../context/CrisisContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Users, FileText, HardDrive, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';

const OnboardingPage = () => {
    const { user, permissions, updatePermissions } = useCrisis();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const permissionList = [
        { id: 'location', label: 'Precise Location', icon: <MapPin size={24} />, desc: 'Required for emergency routing and nearest aid search.' },
        { id: 'calls', label: 'Calls & Messaging', icon: <Phone size={24} />, desc: 'Direct contact with cloud kitchens and emergency services.' },
        { id: 'contacts', label: 'Emergency Contacts', icon: <Users size={24} />, desc: 'For SOS alerts and immediate assistance.' },
        { id: 'files', label: 'Storage & Files', icon: <FileText size={24} />, desc: 'Upload verification documents and medical records.' },
        { id: 'drive', label: 'Google Drive Access', icon: <HardDrive size={24} />, desc: 'Primary backup for emergency data and system preferences.' },
    ];

    const togglePermission = (id) => {
        updatePermissions({ [id]: !permissions[id] });
    };

    const handleComplete = () => {
        setLoading(true);
        setTimeout(() => {
            if (user?.role === 'donor') {
                navigate('/donor-dashboard');
            } else {
                navigate('/dashboard');
            }
        }, 1500);
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', width: '100%', background: '#020617', padding: '40px 20px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '600px', padding: '40px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', marginBottom: '16px' }}>
                        <ShieldCheck size={48} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>System Permissions</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Grant required access for high-priority crisis assistance</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                    {permissionList.map(perm => (
                        <div
                            key={perm.id}
                            onClick={() => togglePermission(perm.id)}
                            className="glass-card"
                            style={{
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                cursor: 'pointer',
                                borderColor: permissions[perm.id] ? 'var(--accent)' : 'var(--glass-border)',
                                background: permissions[perm.id] ? 'rgba(59, 130, 246, 0.05)' : 'var(--glass-bg)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ color: permissions[perm.id] ? 'var(--accent)' : 'var(--text-muted)' }}>
                                {perm.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: '1rem', color: permissions[perm.id] ? 'white' : 'var(--text-muted)' }}>{perm.label}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{perm.desc}</p>
                            </div>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: '2px solid',
                                borderColor: permissions[perm.id] ? 'var(--accent)' : 'var(--glass-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: permissions[perm.id] ? 'var(--accent)' : 'transparent'
                            }}>
                                {permissions[perm.id] && <CheckCircle2 size={16} color="white" />}
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleComplete}
                    className="btn-primary"
                    disabled={loading}
                    style={{ width: '100%', padding: '18px', fontSize: '1.1rem', position: 'relative' }}
                >
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <Loader2 size={24} className="animate-spin" />
                            Initializing Secure Environment...
                        </span>
                    ) : 'Grant All & Initialize'}
                </button>
            </motion.div>
        </div>
    );
};

export default OnboardingPage;
