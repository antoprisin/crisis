import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCrisis } from '../context/CrisisContext';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Heart, ArrowRight, Lock, Fingerprint, Loader2, CheckCircle2, AlertCircle, Mail, Phone, Calendar, Hash } from 'lucide-react';

const LoginPage = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [aadhar, setAadhar] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [step, setStep] = useState(1);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationProgress, setVerificationProgress] = useState(0);
    const { login } = useCrisis();
    const navigate = useNavigate();

    const formatAadhar = (val) => {
        const raw = val.replace(/\D/g, '');
        const groups = raw.match(/.{1,4}/g);
        return groups ? groups.join(' ') : raw;
    };

    const handleNext = () => {
        if (step === 1 && selectedRole) {
            setStep(2);
        }
    };

    const handleVerify = () => {
        if (aadhar.length === 12 && username && email && password && phone && age) {
            setIsVerifying(true);
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setVerificationProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        login(selectedRole, {
                            aadhar,
                            username,
                            email,
                            password,
                            phone,
                            age
                        });
                        navigate('/onboarding');
                    }, 800);
                }
            }, 300);
        }
    };

    return (
        <div className="flex-center" style={{
            minHeight: '100vh',
            width: '100%',
            padding: '20px',
            background: 'var(--background)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{
                    width: '100%',
                    maxWidth: '480px',
                    padding: '48px',
                    textAlign: 'center',
                    zIndex: 1,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
            >
                <div style={{ marginBottom: '40px' }}>
                    <div className="flex-center" style={{ marginBottom: '20px' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary) 0%, #991b1b 100%)',
                            width: '72px',
                            height: '72px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Shield size={36} color="white" />
                        </div>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '4px', letterSpacing: '-1px' }}>BLOOD LINK</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>ADVANCED CRISIS RESPONSE PROTOCOL</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Identity Type</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Select your portal based on your requirement</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedRole('user')}
                                    style={{
                                        height: '140px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        borderRadius: '16px',
                                        border: '2px solid',
                                        borderColor: selectedRole === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                                        background: selectedRole === 'user' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(255,255,255,0.03)',
                                        color: selectedRole === 'user' ? 'white' : 'var(--text-muted)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <User size={32} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>VICTIM / USER</span>
                                    {selectedRole === 'user' && (
                                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <CheckCircle2 size={16} color="var(--primary)" />
                                        </div>
                                    )}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedRole('donor')}
                                    style={{
                                        height: '140px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        borderRadius: '16px',
                                        border: '2px solid',
                                        borderColor: selectedRole === 'donor' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
                                        background: selectedRole === 'donor' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255,255,255,0.03)',
                                        color: selectedRole === 'donor' ? 'white' : 'var(--text-muted)',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Heart size={32} />
                                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>DONOR / HERO</span>
                                    {selectedRole === 'donor' && (
                                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <CheckCircle2 size={16} color="var(--accent)" />
                                        </div>
                                    )}
                                </motion.button>
                            </div>

                            <button
                                disabled={!selectedRole}
                                onClick={handleNext}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    boxShadow: selectedRole ? '0 15px 30px -10px rgba(220, 38, 38, 0.5)' : 'none',
                                    opacity: selectedRole ? 1 : 0.4
                                }}
                            >
                                Continue Verification <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>Security & Profile Setup</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Create your secure link to the response network</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', maxHeight: '350px', overflowY: 'auto', paddingRight: '8px' }} className="no-scrollbar">
                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder="Access Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <Phone size={18} />
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                        />
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                            <Calendar size={18} />
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Age"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                                        <Fingerprint size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        maxLength="15"
                                        placeholder="Aadhar Number"
                                        value={formatAadhar(aadhar)}
                                        onChange={(e) => setAadhar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                                        style={{ width: '100%', padding: '14px 14px 14px 48px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text)', outline: 'none', letterSpacing: '2px' }}
                                    />
                                    {aadhar.length === 12 && (
                                        <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#22c55e' }}>
                                            <CheckCircle2 size={18} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isVerifying && (
                                <div style={{ marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                        <span>Syncing with Govt Database...</span>
                                        <span>{verificationProgress}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '6px', background: 'var(--glass-border)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${verificationProgress}%` }}
                                            style={{ height: '100%', background: 'var(--primary)' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                disabled={aadhar.length !== 12 || isVerifying || !username || !email || !password || !phone || !age}
                                onClick={handleVerify}
                                className="btn-primary"
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    opacity: (aadhar.length === 12 && !isVerifying && username && email && password && phone && age) ? 1 : 0.4
                                }}
                            >
                                {isVerifying ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        SECURE AUTHENTICATING...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        AUTHORIZE IDENTITY
                                    </>
                                )}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                <AlertCircle size={14} />
                                <span>Your identity is encrypted and monitored by AI</span>
                            </div>

                            {!isVerifying && (
                                <button
                                    onClick={() => setStep(1)}
                                    style={{ background: 'none', color: 'var(--text-muted)', marginTop: '20px', fontSize: '0.85rem', fontWeight: 600 }}
                                >
                                    Change Role
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <div style={{ position: 'absolute', bottom: '30px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, opacity: 0.3 }}>
                GOVT AFFILIATED • AI RESPONSE PROTOCOL v4.0.2
            </div>

            <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

export default LoginPage;
