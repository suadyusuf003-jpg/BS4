import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAvailableRooms, createBooking, isLoggedIn } from '../services/api.js'

const MOCK_ROOMS = [
    { id: 1, name: 'Innovation Lab', capacity: 20 },
    { id: 2, name: 'Conference Hall A', capacity: 50 },
    { id: 3, name: 'Creative Studio', capacity: 12 },
    { id: 4, name: 'Training Room', capacity: 30 },
    { id: 5, name: 'Board Room', capacity: 10 },
    { id: 6, name: 'Co-working Space', capacity: 40 },
]

export default function Booking() {
    const [date, setDate] = useState('')
    const [rooms, setRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingRooms, setLoadingRooms] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const today = new Date().toISOString().split('T')[0]

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
        setError('')
        setSuccess('')
        setLoading(true)
        try {
            await createBooking(selectedRoom, date)
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
                                    {room.name} — Capacity: {room.capacity}
                                </option>
                            ))}
                        </select>
                    </div>

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
