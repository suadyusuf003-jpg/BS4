import { useState, useEffect } from 'react'
import { fetchRooms, fetchAvailableRooms } from '../services/api.js'

export default function AdminDashboard() {
    const [rooms, setRooms] = useState([])
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real admin dashboard, we would fetch all bookings
        // For now, let's just show rooms management
        fetchRooms()
            .then(data => setRooms(data || []))
            .catch(() => { })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="page-enter" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage the booking system, rooms, and users.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Rooms Summary */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Rooms Management</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {loading ? (
                            <p style={{ color: 'var(--text-muted)' }}>Loading rooms...</p>
                        ) : rooms.length === 0 ? (
                            <p style={{ color: 'var(--text-muted)' }}>No rooms found.</p>
                        ) : (
                            rooms.map(room => (
                                <div key={room.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem' }}>
                                    <span>{room.name}</span>
                                    <span className="badge badge-approved" style={{ fontSize: '0.7rem' }}>Active</span>
                                </div>
                            ))
                        )}
                        <button className="btn-primary" style={{ marginTop: '0.5rem' }}>+ Add New Room</button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.1)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{rooms.length}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Rooms</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>24</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Bookings</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
