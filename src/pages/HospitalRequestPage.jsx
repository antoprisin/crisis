import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowRight, Droplet, Send, CheckCircle2, MapPin, Loader2, Info, Package, Wrench } from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';
import InteractiveMap from '../components/InteractiveMap';

// Leaflet icon fix
const HospitalRequestPage = ({ type, title }) => {
    const { broadcastRequest, addNotification, resources, activeRequests } = useCrisis();
    const [formData, setFormData] = useState({
        subType: '',
        units: '',
        priority: 'High (1h)',
        customNotes: ''
    });

    const [activeTab, setActiveTab] = useState('request');
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [userLoc, setUserLoc] = useState([13.0827, 80.2707]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => setUserLoc([pos.coords.latitude, pos.coords.longitude]),
                (err) => console.warn("Location access denied. Using Sector 7 default.")
            );
        }
    }, []);

    // Dynamic markers based on type
    const markers = type === 'blood' ? resources.bloodBanks :
        type === 'supplies' ? resources.supplies :
            type === 'equipment' ? resources.equipment : [];

    // Filter active requests related to this page type
    const relevantRequests = activeRequests.filter(r => r.type === type || r.title.toLowerCase().includes(type));

    const handleBroadcast = () => {
        if (!formData.subType || !formData.units) {
            addNotification({ title: 'Missing Data', message: 'Hospital resources require precise telemetry before broadcast.', type: 'error' });
            return;
        }

        setIsBroadcasting(true);
        setTimeout(() => {
            broadcastRequest({
                title: `${title} Required: ${formData.subType}`,
                units: formData.units,
                priority: formData.priority,
                type: type,
                desc: formData.customNotes || `Urgent ${title} requisition for intensive care stabilization.`,
                location: 'Sector 7 General Hospital',
                timestamp: Date.now()
            });
            setIsBroadcasting(false);
            setFormData({ subType: '', units: '', priority: 'High (1h)', customNotes: '' });
            addNotification({ title: 'Flooding Initiated', message: 'Request propagating through mesh network successfully.', type: 'success' });
            setActiveTab('map'); // Switch to map to see progress
        }, 2000);
    };

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '12px', borderRadius: '16px', color: 'var(--primary)' }}>
                        {type === 'blood' ? <Droplet size={32} /> : type === 'supplies' ? <Package size={32} /> : <Wrench size={32} />}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Hospital Node: {title}</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Initiate flooding protocol to secure high-priority medical assets.</p>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'inline-flex', padding: '6px', gap: '6px', background: 'rgba(15, 23, 42, 0.6)', marginTop: '32px' }}>
                    {['request', 'map'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '12px',
                                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            {tab === 'request' ? 'Telemetry Input' : 'Logic Tracking Map'}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'request' ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '48px' }}
                    >
                        <div className="glass-card" style={{ padding: '40px' }}>
                            <h3 style={{ marginBottom: '32px', fontSize: '1.5rem', fontWeight: 800 }}>Resource Requisition</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)' }}>Resource Sub-type</label>
                                    <input
                                        value={formData.subType}
                                        onChange={(e) => setFormData({ ...formData, subType: e.target.value })}
                                        className="glass-card"
                                        style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', border: '1px solid var(--glass-border)', outline: 'none', borderRadius: '12px' }}
                                        placeholder={type === 'blood' ? 'e.g. O+ Positive, A- Negative' : type === 'supplies' ? 'e.g. N95 Masks, Surgical Gloves' : 'e.g. Multi-Para Monitor, Ventilator'}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)' }}>Quantity (Units)</label>
                                        <input
                                            value={formData.units}
                                            onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                                            className="glass-card"
                                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', border: '1px solid var(--glass-border)', outline: 'none', borderRadius: '12px' }}
                                            placeholder="Count"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)' }}>Response Window</label>
                                        <select
                                            value={formData.priority}
                                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                            className="glass-card"
                                            style={{ width: '100%', padding: '16px', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', border: '1px solid var(--glass-border)', outline: 'none', borderRadius: '12px', appearance: 'none' }}
                                        >
                                            <option style={{ background: 'var(--background)', color: 'var(--text)' }}>Immediate (15m)</option>
                                            <option style={{ background: 'var(--background)', color: 'var(--text)' }}>High (1h)</option>
                                            <option style={{ background: 'var(--background)', color: 'var(--text)' }}>Standard (4h)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-muted)' }}>Clinical Notes (AI Context)</label>
                                    <textarea
                                        value={formData.customNotes}
                                        onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                                        className="glass-card"
                                        style={{ width: '100%', padding: '16px', minHeight: '120px', background: 'rgba(255,255,255,0.03)', color: 'var(--text)', border: '1px solid var(--glass-border)', outline: 'none', borderRadius: '12px', resize: 'none' }}
                                        placeholder="Add patient condition or specific hardware requirements for the AI to prioritize donors."
                                    />
                                </div>

                                <button
                                    onClick={handleBroadcast}
                                    disabled={isBroadcasting}
                                    className="btn-primary"
                                    style={{ marginTop: '20px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.1rem' }}
                                >
                                    {isBroadcasting ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            CALCULATING MESH PATHS...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            EXECUTE FLOODING BROADCAST
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div className="glass-card" style={{ padding: '32px', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '6px solid var(--accent)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent)', marginBottom: '16px' }}>
                                    <Info size={24} />
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Request Logic Alpha-4</h4>
                                </div>
                                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                                    The flooding algorithm will prioritize donors with a high trust score and proximity within 5km. All packets are encrypted via sovereign identity keys.
                                </p>
                            </div>

                            <div className="glass-card" style={{ padding: '32px' }}>
                                <h4 style={{ marginBottom: '24px', fontWeight: 800 }}>Verified Mesh Nodes</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {markers.length > 0 ? markers.map((node, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                                                <span style={{ fontSize: '1rem', fontWeight: 600 }}>{node.name}</span>
                                            </div>
                                            <span style={{ background: 'var(--glass-border)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>ONLINE</span>
                                        </div>
                                    )) : (
                                        <p style={{ color: 'var(--text-muted)' }}>No nodes online in this sector.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="map"
                        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                        style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '24px', height: '600px' }}
                    >
                        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                            <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Activity size={20} className="animate-pulse" /> Logic Tracking
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time mesh network propagation status</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div className="glass-card" style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderLeft: '4px solid var(--accent)' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, marginBottom: '4px' }}>Current Protocol</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dijkstra-optimized flooding via {markers.length} nodes</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', display: 'flex', justifyContent: 'space-between' }}>
                                        Active Broadcast Packets
                                        <span style={{ color: 'var(--primary)' }}>{relevantRequests.length}</span>
                                    </h4>
                                    {relevantRequests.length > 0 ? relevantRequests.map((req, i) => (
                                        <div key={i} className="glass-card" style={{ padding: '12px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 800, marginBottom: '4px' }}>{req.title}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Priority: {req.priority}</span>
                                                <span style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 800 }}>PROPAGATING</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', padding: '20px', textAlign: 'center', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
                                            No active transmissions for this resource type.
                                        </div>
                                    )}

                                    <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '16px' }}>Propagation Logs</h4>
                                    {[
                                        { time: 'T-0s', msg: 'Broadcast pulse initiated', status: 'success' },
                                        { time: 'T+2s', msg: 'Scanning sector 7 mesh nodes', status: 'info' },
                                        { time: 'T+5s', msg: `${markers.length} potential hubs identified`, status: 'success' },
                                        { time: 'T+8s', msg: 'Packet encryption verified', status: 'info' },
                                        { time: 'T+12s', msg: 'Routing optimization complete', status: 'success' }
                                    ].map((log, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', padding: '8px', borderRadius: '8px', background: 'var(--glass-bg)' }}>
                                            <span style={{ color: 'var(--accent)', fontWeight: 800, fontFamily: 'monospace' }}>{log.time}</span>
                                            <span style={{ color: 'var(--text-muted)' }}>{log.msg}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--glass-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Network Load</span>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#22c55e' }}>NOMINAL</span>
                                </div>
                                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: '0%' }}
                                        animate={{ width: '45%' }}
                                        style={{ height: '100%', background: '#22c55e' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', height: '100%' }}>
                            <InteractiveMap
                                items={markers}
                                userLocation={userLoc}
                                center={userLoc}
                                zoom={12}
                                lines={markers.map(m => ({
                                    from: userLoc,
                                    to: m.coords,
                                    color: 'var(--primary)',
                                    animate: true
                                }))}
                            />

                            {/* Map Overlays */}
                            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                                <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 23, 42, 0.8)' }}>
                                    <div className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px' }}>LIVE TELEMETRY</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HospitalRequestPage;
