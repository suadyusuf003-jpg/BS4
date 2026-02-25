import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchBookings, cancelBooking, isLoggedIn } from '../services/api.js'

const STATUS_CLASSES = {
    Pending: 'badge badge-pending',
    Approved: 'badge badge-approved',
    Rejected: 'badge badge-rejected',
}

export default function Dashboard() {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const loadBookings = async () => {
        try {
            const data = await fetchBookings()
            setBookings(data || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!isLoggedIn()) { navigate('/login'); return }
        loadBookings()
    }, [])

    const handleCancel = async (id) => {
        if (!confirm('Cancel this booking?')) return
        try {
            await cancelBooking(id)
            setBookings(prev => prev.filter(b => b.id !== id))
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <div className="page-enter" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>My Bookings</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Manage your room reservations</p>
                </div>
                <Link to="/booking">
                    <button className="btn-primary">🗓️ New Booking</button>
                </Link>
            </div>

            {loading && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                    Loading your bookings...
                </div>
            )}

            {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center', color: '#ef4444' }}>
                    ⚠️ {error} — <span style={{ color: 'var(--text-muted)' }}>Make sure the backend is running.</span>
                </div>
            )}

            {!loading && !error && bookings.length === 0 && (
                <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>No bookings yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Start by booking a room</p>
                    <Link to="/booking">
                        <button className="btn-primary">Book Your First Room</button>
                    </Link>
                </div>
            )}

            {!loading && bookings.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {bookings.map(booking => (
                        <div key={booking.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                                    🏠
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>
                                        {booking.room?.name || `Room #${booking.roomId}`}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        📅 {new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                    </div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                        🕒 {booking.startTime?.slice(0, 5)} - {booking.endTime?.slice(0, 5)} ({booking.duration} hrs)
                                    </div>
                                    {booking.totalPrice > 0 && (
                                        <div style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                            Ksh {booking.totalPrice}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className={STATUS_CLASSES[booking.status] || 'badge badge-pending'}>
                                    {booking.status || 'Pending'}
                                </span>
                                {booking.status !== 'Rejected' && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', padding: '0.35rem 0.85rem', borderRadius: '0.4rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s' }}
                                    >
                                        {booking.status === 'Approved' ? 'Delete' : 'Cancel'}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
