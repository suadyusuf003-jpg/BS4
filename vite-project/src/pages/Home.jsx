import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchRooms } from '../services/api.js'

const MOCK_ROOMS = [
    { id: 1, name: 'Innovation Lab', capacity: 20, description: 'A modern space for tech workshops and hackathons.' },
    { id: 2, name: 'Conference Hall A', capacity: 50, description: 'Fully equipped conference room with projector and sound system.' },
    { id: 3, name: 'Creative Studio', capacity: 12, description: 'Ideal for design sprints, brainstorming, and creative sessions.' },
    { id: 4, name: 'Training Room', capacity: 30, description: 'Comfortable training space with whiteboards and flip charts.' },
    { id: 5, name: 'Board Room', capacity: 10, description: 'Executive meeting room with video conferencing capabilities.' },
    { id: 6, name: 'Co-working Space', capacity: 40, description: 'Open co-working area with fast Wi-Fi and ergonomic seating.' },
]

export default function Home() {
    const [rooms, setRooms] = useState(MOCK_ROOMS)

    useEffect(() => {
        fetchRooms()
            .then(data => { if (data?.length) setRooms(data) })
            .catch(() => { }) // use mock data if backend is offline
    }, [])

    return (
        <div className="page-enter">
            {/* Hero */}
            <section className="hero-bg" style={{ padding: '5rem 1.5rem', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.3rem 1rem',
                        background: 'rgba(99,102,241,0.15)',
                        border: '1px solid rgba(99,102,241,0.3)',
                        borderRadius: '9999px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#818cf8',
                        marginBottom: '1.5rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                    }}>
                        🌍 Swahilipot Hub Foundation
                    </div>
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
                        Book Your Perfect{' '}
                        <span className="gradient-text">Space</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
                        Reserve rooms and manage your bookings at Swahilipot Hub — the innovation hub of the Swahili Coast.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/booking">
                            <button className="btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
                                🗓️ Book a Room
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>
                                Get Started →
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ background: 'rgba(30,41,59,0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2rem 1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
                    {[
                        { value: '6+', label: 'Rooms Available' },
                        { value: '500+', label: 'Bookings Made' },
                        { value: '24/7', label: 'Support' },
                        { value: '100%', label: 'Satisfaction' },
                    ].map(({ value, label }) => (
                        <div key={label}>
                            <div style={{ fontSize: '2rem', fontWeight: 800 }} className="gradient-text">{value}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Rooms Grid */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Available Rooms</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Choose from our range of professional spaces</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {rooms.map((room) => (
                        <div key={room.id} className="glass-card" style={{ padding: '1.5rem' }}>
                            <div style={{
                                width: '48px', height: '48px',
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
                                borderRadius: '0.75rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem', marginBottom: '1rem',
                            }}>
                                🏠
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{room.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: 1.6 }}>
                                {room.description || 'A great space for your needs.'}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                    👥 Capacity: <strong style={{ color: 'var(--text-primary)' }}>{room.capacity}</strong>
                                </span>
                                <Link to="/booking">
                                    <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
                                        Book Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--border)', padding: '2rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                © 2025 Swahilipot Hub Foundation. All rights reserved.
            </footer>
        </div>
    )
}
