import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Home,
    MapPin,
    Stethoscope,
    HeartPulse,
    Droplet,
    Pill,
    LogOut,
    Bell,
    MessageSquare,
    Activity,
    Shield,
    Info,
    HelpCircle,
    User,
    Sun,
    Moon,
    Monitor
} from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useCrisis();

    return (
        <div className="glass-card" style={{ padding: '6px', display: 'flex', gap: '4px', marginBottom: '16px', background: 'var(--glass-bg)' }}>
            {[
                { id: 'light', icon: <Sun size={18} />, label: 'Light' },
                { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
                { id: 'system', icon: <Monitor size={18} />, label: 'System' }
            ].map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '10px 0',
                        borderRadius: '10px',
                        background: theme === t.id ? 'var(--primary)' : 'transparent',
                        color: theme === t.id ? 'white' : 'var(--text-muted)',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {t.icon}
                    {t.label.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

const Sidebar = () => {
    const { logout, user } = useCrisis();

    const navItems = user?.role === 'donor' ? [
        { icon: <Home size={20} />, label: 'Command Center', path: '/donor-dashboard' },
        { icon: <MapPin size={20} />, label: 'Global Map', path: '/map' },
        { icon: <Bell size={20} />, label: 'Active Alerts', path: '/donor-dashboard' },
        { type: 'separator', label: 'SYSTEM INFO' },
        { icon: <Info size={20} />, label: 'About Tech', path: '/about' },
        { icon: <HelpCircle size={20} />, label: 'FAQ Terminal', path: '/faq' },
    ] : [
        { icon: <Home size={20} />, label: 'Overview', path: '/dashboard' },
        { icon: <MapPin size={20} />, label: 'Live Map', path: '/map' },
        { icon: <Stethoscope size={20} />, label: 'Volunteer Docs', path: '/doctors' },
        { icon: <HeartPulse size={20} />, label: 'Health Centers', path: '/health-centers' },
        { type: 'separator', label: 'HOSPITAL TELEMETRY' },
        { icon: <Droplet size={20} />, label: 'Blood Req', path: '/hospital/blood' },
        { icon: <Pill size={20} />, label: 'Medicines', path: '/hospital/medicines' },
        { type: 'separator', label: 'SYSTEM INFO' },
        { icon: <Info size={20} />, label: 'About Tech', path: '/about' },
        { icon: <HelpCircle size={20} />, label: 'FAQ Terminal', path: '/faq' },
    ];

    return (
        <div style={{
            width: '280px',
            height: '100vh',
            background: 'var(--sidebar-bg)',
            borderRight: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 20px',
            position: 'relative',
            zIndex: 100
        }}>
            <div style={{ padding: '0 12px', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--primary) 0%, #991b1b 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Shield size={24} color="white" />
                    </div>
                    BLOOD LINK
                </h2>
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
                    NEURAL LINK SECURE
                </div>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }} className="no-scrollbar">
                {navItems.map((item, index) => {
                    if (item.type === 'separator') {
                        return (
                            <div key={index} style={{
                                margin: '32px 12px 12px',
                                fontSize: '0.75rem',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                color: 'var(--text-muted)',
                                opacity: 0.5,
                                letterSpacing: '2px'
                            }}>
                                {item.label}
                            </div>
                        );
                    }
                    return (
                        <NavLink
                            key={item.path + index}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '14px 16px',
                                textDecoration: 'none',
                                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                                background: isActive ? 'var(--glass-bg)' : 'transparent',
                                borderRadius: '14px',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent'
                            })}
                        >
                            <span style={{ color: 'inherit' }}>
                                {item.icon}
                            </span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 800, paddingLeft: '12px', letterSpacing: '1px' }}>TERMINAL THEME</div>
                <ThemeSwitcher />

                <NavLink
                    to="/profile"
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px',
                        textDecoration: 'none',
                        color: isActive ? 'white' : 'var(--text)',
                        background: isActive ? 'var(--primary)' : 'var(--glass-bg)',
                        borderRadius: '16px',
                        marginBottom: '16px',
                        border: '1px solid var(--glass-border)',
                        transition: 'all 0.3s'
                    })}
                >
                    <User size={22} />
                    <span style={{ fontWeight: 800 }}>MY PROFILE</span>
                </NavLink>

                <div className="glass-card" style={{ padding: '16px', marginBottom: '24px', background: 'var(--glass-bg)' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 700 }}>VERIFIED SESSION</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text)' }}>
                        {user?.username || (user?.aadhar ? `ID: ${user.aadhar.slice(0, 4)} **** ${user.aadhar.slice(-4)}` : 'GUEST')}
                    </div>
                </div>
                <button
                    onClick={logout}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#ef4444',
                        fontSize: '1rem',
                        fontWeight: 800,
                        borderRadius: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}
                >
                    <LogOut size={20} />
                    SYSTEM TERMINATE
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
