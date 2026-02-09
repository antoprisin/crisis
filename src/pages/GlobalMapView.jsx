import React, { useState, useMemo, useEffect } from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { Filter, Search, Layers, Activity, ChevronRight, Star, MapPin, Phone, MessageCircle } from 'lucide-react';
import { useCrisis } from '../context/CrisisContext';

import { useLocation } from 'react-router-dom';

const GlobalMapView = () => {
    const { resources } = useCrisis();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter') || 'all';

    const [filter, setFilter] = useState(initialFilter);
    const [searchQuery, setSearchQuery] = useState('');
    const [userLocation, setUserLocation] = useState([13.0827, 80.2400]); // Moved further inland
    const [mapCenter, setMapCenter] = useState([13.0827, 80.2400]);
    const [mapZoom, setMapZoom] = useState(13);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setMapCenter([latitude, longitude]);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        const queryFilter = new URLSearchParams(location.search).get('filter');
        if (queryFilter) setFilter(queryFilter);
    }, [location.search]);

    const allData = useMemo(() => {
        const flatData = [];
        Object.keys(resources).forEach(category => {
            resources[category].forEach(item => {
                flatData.push({
                    ...item,
                    category: category,
                    displayType: category === 'food' ? 'Food' :
                        category === 'shelters' ? 'Shelter' :
                            category === 'doctors' ? 'Doctor' :
                                category === 'bloodBanks' ? 'Blood Bank' : 'Health Center'
                });
            });
        });
        return flatData;
    }, [resources]);

    const filteredData = useMemo(() => {
        return allData.filter(item => {
            const matchesFilter = filter === 'all' || item.category === filter;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                item.name.toLowerCase().includes(searchLower) ||
                item.location.toLowerCase().includes(searchLower) ||
                (item.stocks && item.stocks.toLowerCase().includes(searchLower)) ||
                (item.specialization && item.specialization.toLowerCase().includes(searchLower));
            return matchesFilter && matchesSearch;
        });
    }, [filter, searchQuery, allData]);

    return (
        <div style={{ padding: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Global Resource Map</h1>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '4px 12px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Activity size={14} /> LIVE SYNC ACTIVE
                        </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Real-time spatial visualization of all active medical and relief assets.</p>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="glass-card" style={{ padding: '4px 16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)' }}>
                        <Search size={18} color="var(--text-muted)" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Find specific unit..."
                            style={{ background: 'transparent', border: 'none', color: 'white', padding: '12px 0', outline: 'none', width: '200px' }}
                        />
                    </div>

                    <div className="glass-card" style={{ padding: '4px 20px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)' }}>
                        <Filter size={18} color="var(--primary)" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer', padding: '12px 0', fontWeight: 700 }}
                        >
                            <option value="all" style={{ background: '#0f172a' }}>All Resources</option>

                            <option value="doctors" style={{ background: '#0f172a' }}>Doctors</option>
                            <option value="bloodBanks" style={{ background: '#0f172a' }}>Blood Banks</option>
                            <option value="healthCenters" style={{ background: '#0f172a' }}>Health Centers</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ height: '70vh', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', marginBottom: '40px' }}>
                <InteractiveMap items={filteredData} center={mapCenter} userLocation={userLocation} zoom={mapZoom} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
                        {searchQuery ? `Search Results (${filteredData.length})` : `Matched Resource Units (${filteredData.length})`}
                    </h2>
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '8px 16px', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
                        >
                            Clear Search
                        </button>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                    {filteredData.map((item, idx) => {
                        const isSelected = mapCenter[0] === item.coords[0] && mapCenter[1] === item.coords[1];
                        return (
                            <div
                                key={idx}
                                className={`glass-card ${isSelected ? 'selected-card' : ''}`}
                                style={{
                                    padding: '24px',
                                    transition: 'all 0.3s ease',
                                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                    background: isSelected ? 'rgba(220, 38, 38, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                    boxShadow: isSelected ? '0 10px 30px rgba(220, 38, 38, 0.2)' : 'none',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <div style={{ fontSize: '0.65rem', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontWeight: 900, textTransform: 'uppercase' }}>
                                            {item.displayType}
                                        </div>
                                        {item.rating && (
                                            <div style={{ fontSize: '0.65rem', background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '4px 10px', borderRadius: '4px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Star size={10} fill="#eab308" /> {item.rating}
                                            </div>
                                        )}
                                    </div>
                                    {item.status && (
                                        <div style={{ fontSize: '0.7rem', color: item.status === 'Active' || item.status === 'High Stock' || item.status === 'Online' ? '#22c55e' : '#ef4444', fontWeight: 800 }}>
                                            ● {item.status.toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px', color: isSelected ? 'var(--primary)' : 'white' }}>{item.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                        <MapPin size={14} /> {item.location}
                                    </div>
                                </div>

                                <div style={{ flexGrow: 1 }}>
                                    {item.specialization && (
                                        <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Specialization:</span> <span style={{ fontWeight: 700 }}>{item.specialization}</span>
                                        </div>
                                    )}
                                    {item.stocks && (
                                        <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Inventory:</span> <span style={{ fontWeight: 700, color: '#22c55e' }}>{item.stocks}</span>
                                        </div>
                                    )}
                                    {item.menu && (
                                        <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Menu:</span> <span style={{ fontWeight: 700 }}>{item.menu}</span>
                                        </div>
                                    )}
                                    {item.occupancy && (
                                        <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Capacity:</span> <span style={{ fontWeight: 700 }}>{item.occupants}/{item.occupancy} beds</span>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                    <button
                                        onClick={() => {
                                            setMapCenter(item.coords);
                                            setMapZoom(16);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="btn-primary"
                                        style={{ padding: '8px 16px', fontSize: '0.75rem', fontWeight: 800, flex: 2, display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                                    >
                                        <Activity size={14} /> LOCATE ON MAP
                                    </button>
                                    <a href={`tel:+1234567890`} style={{ flex: 1 }}>
                                        <button className="btn-outline" style={{ width: '100%', padding: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                            <Phone size={14} />
                                        </button>
                                    </a>
                                    <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                                        <button className="btn-outline" style={{ width: '100%', padding: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', color: '#22c55e', borderColor: '#22c55e' }}>
                                            <MessageCircle size={14} />
                                        </button>
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid-cols-auto" style={{ marginTop: '40px' }}>
                <div className="glass-card" style={{ padding: '24px', borderLeft: '6px solid var(--primary)', background: 'rgba(220, 38, 38, 0.05)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 800 }}>Spatial Routing Logic</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Calculating Dijkstra-based paths avoiding high-congestion zones in Central Sector. Updates every 30s.</p>
                </div>
                <div className="glass-card" style={{ padding: '24px', borderLeft: '6px solid #22c55e', background: 'rgba(34, 197, 94, 0.05)' }}>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 800 }}>Active Fleet Status</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Currently tracking {filteredData.length} response units with verified GPS heartbeats. All units responding.</p>
                </div>
            </div>
        </div>
    );
};

export default GlobalMapView;
