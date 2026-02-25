import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAvailableRooms, createBooking, isLoggedIn } from '../services/api.js'

const MOCK_ROOMS = [
    { id: 1, name: 'Innovation Lab', capacity: 20, hourlyPrice: 1500 },
    { id: 2, name: 'Conference Hall A', capacity: 50, hourlyPrice: 5000 },
    { id: 3, name: 'Creative Studio', capacity: 12, hourlyPrice: 1000 },
    { id: 4, name: 'Training Room', capacity: 30, hourlyPrice: 2000 },
    { id: 5, name: 'Board Room', capacity: 10, hourlyPrice: 1000 },
    { id: 6, name: 'Co-working Space', capacity: 40, hourlyPrice: 3000 },
]

export default function Booking() {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('09:00')
    const [endTime, setEndTime] = useState('10:00')
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingRooms, setLoadingRooms] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const today = new Date().toISOString().split('T')[0]

    const roomDetails = rooms.find(r => r.id === parseInt(selectedRoom))
    const hourlyPrice = roomDetails?.hourlyPrice || 0

    // Calculate total price
    const start = new Date(`${date}T${startTime}`)
    const end = new Date(`${date}T${endTime}`)
    const duration = (end - start) / (1000 * 60 * 60)
    const totalPrice = duration > 0 ? duration * hourlyPrice : 0

    useEffect(() => {
        if (!date) return
        setLoadingRooms(true)
        setSelectedRoom('')
        fetchAvailableRooms(date)
            .then(data => setRooms(data?.length ? data : MOCK_ROOMS))
            .catch(() => setRooms(MOCK_ROOMS))
            .finally(() => setLoadingRooms(false))
    }, [date])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isLoggedIn()) { navigate('/login'); return }
        if (duration <= 0) { setError('End time must be after start time'); return }
        setError('')
        setSuccess('')
        setLoading(true)
        try {
            await createBooking(selectedRoom, date, startTime, endTime)
            setSuccess('🎉 Room booked successfully! Check your dashboard.')
            setDate('')
            setSelectedRoom('')
            setRooms([])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-enter" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🗓️</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.4rem' }}>Book a Room</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Select a date to see available rooms</p>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#ef4444', fontSize: '0.875rem' }}>
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.5rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#10b981', fontSize: '0.875rem' }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label className="form-label">Select Date</label>
                        <input
                            id="bookingDate"
                            type="date"
                            className="form-input"
                            value={date}
                            min={today}
                            onChange={e => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label className="form-label">Start Time</label>
                            <input
                                type="time"
                                className="form-input"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label">End Time</label>
                            <input
                                type="time"
                                className="form-input"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">
                            Select Room {loadingRooms && <span style={{ color: 'var(--accent)' }}>⏳ Loading...</span>}
                        </label>
                        <select
                            id="roomSelect"
                            className="form-input"
                            value={selectedRoom}
                            onChange={e => setSelectedRoom(e.target.value)}
                            required
                            disabled={!date || loadingRooms}
                        >
                            <option value="">
                                {!date ? 'Pick a date first' : loadingRooms ? 'Loading rooms...' : 'Choose a room'}
                            </option>
                            {rooms.map(room => (
                                <option key={room.id} value={room.id}>
                                    {room.name} — Capacity: {room.capacity} {room.hourlyPrice ? `(Ksh ${room.hourlyPrice}/hr)` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedRoom && roomDetails && (
                        <div style={{
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '0.5rem',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Hourly Rate:</span>
                                <span style={{ fontWeight: 600 }}>Ksh {roomDetails.hourlyPrice}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Duration:</span>
                                <span style={{ fontWeight: 600 }}>{duration.toFixed(2)} hours</span>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(99,102,241,0.2)', paddingTop: '0.5rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 700 }}>Total Price:</span>
                                <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '1.1rem' }}>Ksh {totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    )}

                    <button
                        id="bookBtn"
                        type="submit"
                        className="btn-primary"
                        disabled={loading || !selectedRoom}
                        style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '1rem', marginTop: '0.5rem' }}
                    >
                        {loading ? '⏳ Booking...' : '✅ Confirm Booking'}
                    </button>
                </form>
            </div>
        </div>
    )
}
