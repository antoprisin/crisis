import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Phone, MessageCircle, Navigation } from 'lucide-react';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
};

const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const InteractiveMap = ({ items, center = [13.0827, 80.2707], userLocation = [13.0827, 80.2707], zoom = 12, lines = [] }) => {
    // Custom icon for user location
    const UserIcon = L.divIcon({
        html: `<div class="user-marker-container">
                <div class="user-marker-pulse"></div>
                <div class="user-marker-dot"></div>
               </div>`,
        className: 'user-marker-custom',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
    });

    return (
        <div className="glass-card" style={{ height: '500px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ChangeView center={center} zoom={zoom} />

                {/* User Marker */}
                <Marker position={userLocation} icon={UserIcon}>
                    <Popup>Your Current Location (Satellite Locked)</Popup>
                </Marker>

                {/* Render Logic Tracking Lines */}
                {lines.map((line, idx) => (
                    <Polyline
                        key={`line-${idx}`}
                        positions={[line.from, line.to]}
                        pathOptions={{
                            color: line.color || 'var(--primary)',
                            weight: 2,
                            opacity: 0.6,
                            dashArray: '10, 10',
                            dashOffset: '0',
                            interactive: false,
                            className: line.animate ? 'leaflet-ant-path-logic' : ''
                        }}
                    >
                    </Polyline>
                ))}

                {items.map((item, idx) => {
                    const distance = item.coords ? calculateDistance(userLocation[0], userLocation[1], item.coords[0], item.coords[1]) : 0;

                    return (
                        <Marker
                            key={idx}
                            position={item.coords || center}
                        >
                            <Popup minWidth={250}>
                                <div style={{ padding: '4px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                        <h4 style={{ margin: 0, color: 'var(--primary)', fontWeight: 800 }}>{item.name}</h4>
                                        <span style={{ fontSize: '0.7rem', background: 'var(--accent)', padding: '2px 8px', borderRadius: '4px', color: 'white', fontWeight: 800 }}>{item.displayType || item.type}</span>
                                    </div>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.location}</p>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '0.85rem' }}>
                                        <div style={{ padding: '4px 8px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', borderRadius: '6px', fontWeight: 900 }}>
                                            {distance} km
                                        </div>
                                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Estimated Response Distance</span>
                                    </div>

                                    {item.stocks && (
                                        <div style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text)' }}>
                                            Available Stocks: <strong style={{ color: '#22c55e' }}>{item.stocks}</strong>
                                        </div>
                                    )}

                                    {item.occupancy && (
                                        <div style={{ fontSize: '0.75rem', marginBottom: '8px', color: 'var(--text)' }}>
                                            Capacity: <strong>{item.occupants}/{item.occupancy}</strong>
                                        </div>
                                    )}

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                                        <a href={`tel:+1234567890`} style={{ textDecoration: 'none' }}>
                                            <button className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                                                <Phone size={14} /> Call Hub
                                            </button>
                                        </a>
                                        <a href={`https://wa.me/1234567890`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                            <button className="btn-outline" style={{ width: '100%', padding: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', color: '#22c55e', borderColor: '#22c55e' }}>
                                                <MessageCircle size={14} /> Secure Chat
                                            </button>
                                        </a>
                                    </div>

                                    <a
                                        href={`https://www.google.com/maps/dir/?api=1&destination=${item.coords[0]},${item.coords[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <button className="btn-outline" style={{ width: '100%', marginTop: '8px', padding: '10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontWeight: 800 }}>
                                            <Navigation size={14} /> GPS Navigation (External)
                                        </button>
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Legend / Overlay */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                zIndex: 1000,
                padding: '12px',
                background: 'var(--sidebar-bg)',
                borderRadius: '8px',
                border: '1px solid var(--glass-border)',
                fontSize: '0.75rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%' }}></div>
                    <span>Active Relief Points</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span>Your Location</span>
                </div>
            </div>
        </div>
    );
};

export default InteractiveMap;
