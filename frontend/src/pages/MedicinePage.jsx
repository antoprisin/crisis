import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, Clock, ShieldCheck, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCrisis } from '../context/CrisisContext';
import { MEDICINE_DATA } from '../data/medicineData';

const MedicineProduct = ({ name, price, rating, reviews, image, onAdd }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card"
        style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
        <div style={{ width: '100%', height: '180px', background: 'white', borderRadius: '12px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px', minHeight: '44px' }}>{name}</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {rating} <Star size={12} fill="white" />
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{reviews} reviews</span>
            </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 900, fontSize: '1.4rem', color: 'var(--text)' }}>₹{price}</span>
            <button
                onClick={() => onAdd({ name, price, image })}
                className="btn-primary"
                style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 900 }}
            >
                ADD TO KIT
            </button>
        </div>
    </motion.div>
);

const MedicinePage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const { addNotification } = useCrisis();
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const currentCategoryKey = category || 'health-conditions';
    const categoryData = MEDICINE_DATA[currentCategoryKey] || MEDICINE_DATA['health-conditions'];

    const categories = [
        { name: 'Diabetes Care', key: 'diabetes-care' },
        { name: 'Health Conditions', key: 'health-conditions' },
        { name: 'Ayurveda', key: 'ayurveda' },
        { name: 'Homeopathy', key: 'homeopathy' },
        { name: 'Nutritional Drinks', key: 'nutritional-drinks' }
    ];

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.name === product.name);
            if (existing) {
                return prev.map(item => item.name === product.name ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        addNotification({ title: 'Item Added', message: `${product.name} added to crisis kit.`, type: 'info' });
    };

    const removeFromCart = (name) => {
        setCart(prev => prev.filter(item => item.name !== name));
    };

    const handleConfirmProcurement = () => {
        if (cart.length === 0) {
            addNotification({ title: 'Kit Empty', message: 'Add medicines to your crisis kit before confirming procurement.', type: 'error' });
            return;
        }

        addNotification({
            title: 'Procurement Initialized',
            message: `Dispatching ${cart.length} units to Sector 7 Hospital. Estimated ETA: 12 mins.`,
            type: 'success'
        });
        setCart([]);
        setIsCartOpen(false);
    };

    const filteredProducts = categoryData.products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '40px' }}>
            {/* Header with Search and Cart */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', gap: '24px', marginBottom: '48px', alignItems: 'center', background: 'var(--glass-bg)' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={22} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6 }} />
                    <input
                        placeholder={`Search in ${categoryData.title}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: '100%', padding: '16px 16px 16px 60px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '16px', color: 'var(--text)', fontSize: '1rem', outline: 'none' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '32px', alignItems: 'center', padding: '0 20px' }}>
                    <div style={{ cursor: 'pointer', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <Clock size={24} />
                        <div style={{ fontSize: '0.7rem', marginTop: '4px', fontWeight: 700 }}>HISTORY</div>
                    </div>
                    <div onClick={() => setIsCartOpen(!isCartOpen)} style={{ cursor: 'pointer', textAlign: 'center', color: cart.length > 0 ? 'var(--accent)' : 'var(--text-muted)', position: 'relative' }}>
                        <ShoppingCart size={24} />
                        <div style={{ fontSize: '0.7rem', marginTop: '4px', fontWeight: 700 }}>KIT CART</div>
                        {cart.length > 0 && (
                            <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--primary)', color: 'white', fontSize: '0.7rem', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #020617' }}>
                                {cart.length}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '48px' }}>
                {/* Side Navigation Categories */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card" style={{ padding: '24px' }}>
                        <h4 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 800 }}>Categories</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {categories.map(cat => (
                                <Link
                                    key={cat.key}
                                    to={`/hospital/medicines/${cat.key}`}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: '12px',
                                        textDecoration: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: currentCategoryKey === cat.key ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                                        color: currentCategoryKey === cat.key ? 'var(--text)' : 'var(--text-muted)',
                                        border: currentCategoryKey === cat.key ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid transparent',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <span style={{ fontWeight: currentCategoryKey === cat.key ? 800 : 500 }}>{cat.name}</span>
                                    {currentCategoryKey === cat.key && <ArrowRight size={16} color="var(--primary)" />}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '24px', background: 'rgba(34, 197, 94, 0.05)', borderLeft: '6px solid #22c55e' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#22c55e', marginBottom: '8px' }}>
                            <ShieldCheck size={20} />
                            <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>ISO CERTIFIED</span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                            Supply chain verification active for {categoryData.title}.
                        </p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div>
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ width: '100%', height: '240px', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', position: 'relative' }}>
                            <img src={categoryData.bannerImage} alt={categoryData.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))' }} />
                        </div>
                        <h2 style={{ fontSize: '2.4rem', fontWeight: 900, marginBottom: '8px' }}>{categoryData.title}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{categoryData.description}</p>
                    </div>

                    <div className="grid-cols-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '32px' }}>
                        {filteredProducts.map((med) => (
                            <MedicineProduct key={med.id} {...med} onAdd={addToCart} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="glass-card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No items found matching your search in this category.
                        </div>
                    )}
                </div>
            </div>

            {/* Cart Sidebar Overlay */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, backdropFilter: 'blur(4px)' }}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', background: 'var(--background)', zIndex: 1001, borderLeft: '1px solid var(--glass-border)', padding: '40px', display: 'flex', flexDirection: 'column' }}
                        >
                            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '32px' }}>Disaster Kit</h2>
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }} className="no-scrollbar">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                        <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '8px', padding: '4px' }}>
                                            <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>₹{item.price} × {item.qty}</div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.name)} style={{ background: 'none', color: '#ef4444' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                                {cart.length === 0 && (
                                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>Your kit is currently empty.</div>
                                )}
                            </div>
                            <div style={{ marginTop: '40px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Total Cost</span>
                                    <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>₹{cartTotal}</span>
                                </div>
                                <button
                                    onClick={handleConfirmProcurement}
                                    className="btn-primary"
                                    style={{ width: '100%', padding: '18px', fontSize: '1.1rem' }}
                                >
                                    CONFIRM PROCUREMENT
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MedicinePage;

