import { Link, useNavigate, useLocation } from 'react-router-dom'
import { isLoggedIn, isAdmin, logoutUser } from '../services/api.js'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const loggedIn = isLoggedIn()
    const admin = isAdmin()

    const handleLogout = () => {
        logoutUser()
        navigate('/login')
    }

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/booking', label: 'Book Room' },
        { to: '/dashboard', label: 'Dashboard' },
    ]

    if (admin) {
        navLinks.push({ to: '/admin', label: 'Admin' })
    }

    return (
        <nav style={{
            background: 'rgba(15,23,42,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(99,102,241,0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800 }} className="gradient-text">
                            🏢 Swahilipot Hub
                        </span>
                    </Link>

                    {/* Nav links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {navLinks.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                style={{
                                    padding: '0.4rem 0.9rem',
                                    borderRadius: '0.4rem',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    color: isActive(to) ? '#6366f1' : '#94a3b8',
                                    background: isActive(to) ? 'rgba(99,102,241,0.1)' : 'transparent',
                                    transition: 'all 0.2s',
                                }}
                            >
                                {label}
                            </Link>
                        ))}

                        {loggedIn ? (
                            <button onClick={handleLogout} className="btn-secondary" style={{ marginLeft: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                                Logout
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
                                <Link to="/login">
                                    <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>Login</button>
                                </Link>
                                <Link to="/register">
                                    <button className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>Register</button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
