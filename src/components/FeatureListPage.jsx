import React, { useState } from 'react';
import { Phone, MessageCircle, Star, MapPin, List, Map as MapIcon, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveMap from './InteractiveMap';

const ContactCard = ({ item }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card"
        style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}
    >
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'white', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${item.name}&backgroundColor=0f172a&fontSize=40`}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{item.name}</h3>
                    <span style={{ fontSize: '0.7rem', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '50px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.type}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 700 }}><Star size={16} fill="#f59e0b" /> {item.rating}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} /> {item.location}</span>
                    {item.specialization && <span style={{ color: 'var(--accent)' }}>• {item.specialization}</span>}
                    {item.occupancy && <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>{item.occupants}/{item.occupancy} Slots</span>}
                </div>
                {item.menu && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px', opacity: 0.8 }}><strong>Supplies:</strong> {item.menu}</p>}
            </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
            <a href={`https://wa.me/911234567890`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.9rem', color: '#22c55e', borderColor: 'rgba(34, 197, 94, 0.4)' }}>
                    <MessageCircle size={18} />
                    WhatsApp
                </button>
            </a>
            <a href={`tel:+911234567890`} style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '0.9rem' }}>
                    <Phone size={18} />
                    Call Now
                </button>
            </a>
        </div>
    </motion.div>
);

const FeatureListPage = ({ title, items = [], description }) => {
    const [viewMode, setViewMode] = useState('list');

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px' }}>{title}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{description || `System found ${items.length} verified response units in your area`}</p>
                </div>

                <div className="glass-card" style={{ padding: '6px', display: 'flex', gap: '6px', background: 'rgba(15, 23, 42, 0.6)' }}>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                            color: viewMode === 'list' ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <List size={20} />
                        List
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '10px',
                            background: viewMode === 'map' ? 'var(--primary)' : 'transparent',
                            color: viewMode === 'map' ? 'white' : 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '0.9rem'
                        }}
                    >
                        <MapIcon size={20} />
                        Map View
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === 'list' ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        {items.length > 0 ? (
                            items.map((item, idx) => (
                                <ContactCard key={item.id || idx} item={item} />
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', padding: '80px', border: '2px dashed var(--glass-border)', borderRadius: '24px' }}>
                                <MapPin size={48} color="var(--text-muted)" style={{ marginBottom: '16px', opacity: 0.3 }} />
                                <h3 style={{ color: 'var(--text-muted)' }}>No resources available in this sector</h3>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="map"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                    >
                        <InteractiveMap items={items} center={items[0]?.coords} />
                        <div style={{ marginTop: '24px' }} className="glass-card">
                            <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px' }}>
                                    <Navigation size={28} color="var(--accent)" />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800 }}>AI Routing Active</h4>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '2px' }}>Optimizing travel paths across {items.length} points of interest. Real-time traffic avoidance enabled.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeatureListPage;
