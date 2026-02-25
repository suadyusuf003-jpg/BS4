import { useState, useEffect } from 'react'
import { fetchRooms, fetchAllBookings, updateBookingStatus, cancelBooking } from '../services/api.js'

const STATUS_CLASSES = {
    Pending: 'badge badge-pending',
    Approved: 'badge badge-approved',
    Rejected: 'badge badge-rejected',
}

export default function AdminDashboard() {
    const [rooms, setRooms] = useState([])
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(null)
    const [error, setError] = useState('')

    const loadData = async () => {
        try {
            setLoading(true)
            const [roomsData, bookingsData] = await Promise.all([
                fetchRooms(),
                fetchAllBookings()
            ])
            setRooms(roomsData || [])
            setBookings(bookingsData || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleAction = async (id, status) => {
        if (!confirm(`Are you sure you want to ${status.toLowerCase()} this booking?`)) return
        setActionLoading(id)
        try {
            await updateBookingStatus(id, status)
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
        } catch (err) {
            alert(err.message)
        } finally {
            setActionLoading(null)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Permanently delete this booking record?')) return
        setActionLoading(id)
        try {
            await cancelBooking(id)
            setBookings(prev => prev.filter(b => b.id !== id))
        } catch (err) {
            alert(err.message)
        } finally {
            setActionLoading(null)
        }
    }

    return (
        <div className="page-enter" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage the booking system, rooms, and users.</p>
                </div>
                <button onClick={loadData} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>🔄 Refresh Data</button>
            </div>

            {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '2rem', color: '#ef4444' }}>
                    ⚠️ {error} — <span style={{ color: 'var(--text-muted)' }}>Make sure the backend is running.</span>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Bookings Management */}
                <div className="glass-card" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Recent Bookings</h2>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                            Loading bookings...
                        </div>
                    ) : bookings.length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No bookings found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>User</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Room</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Date & Time</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Price</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Status</th>
                                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map(booking => (
                                        <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} className="table-row-hover">
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: 600 }}>{booking.user?.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{booking.user?.email}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>{booking.room?.name}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <div>{booking.date}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                    {booking.startTime?.slice(0, 5)} - {booking.endTime?.slice(0, 5)}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent)' }}>Ksh {booking.totalPrice}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span className={STATUS_CLASSES[booking.status]}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                    {booking.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                disabled={actionLoading === booking.id}
                                                                onClick={() => handleAction(booking.id, 'Approved')}
                                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.4rem', cursor: 'pointer' }}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                disabled={actionLoading === booking.id}
                                                                onClick={() => handleAction(booking.id, 'Rejected')}
                                                                style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.4rem', cursor: 'pointer' }}
                                                            >
                                                                Decline
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        disabled={actionLoading === booking.id}
                                                        onClick={() => handleDelete(booking.id)}
                                                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', background: 'rgba(239,68,68,0.05)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', borderRadius: '0.4rem', cursor: 'pointer' }}
                                                        title="Delete booking permanently"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

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
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)' }}>Ksh {room.hourlyPrice}/hr</span>
                                </div>
                            ))
                        )}
                        <button className="btn-primary" style={{ marginTop: '0.5rem' }}>+ Add New Room</button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Stats</h2>
                    <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '1rem' }}>
                        <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.1)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{rooms.length}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Rooms</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)' }}>{bookings.filter(b => b.status === 'Approved').length}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Approved</div>
                        </div>
                        <div style={{ padding: '1rem', background: 'rgba(239,68,68,0.1)', borderRadius: '0.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>{bookings.filter(b => b.status === 'Pending').length}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pending</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
