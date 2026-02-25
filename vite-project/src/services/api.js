const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

async function request(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
}

// Auth
export const loginUser = (email, password) => request('/auth/login', 'POST', { email, password });
export const registerUser = (name, email, password) => request('/auth/register', 'POST', { name, email, password });
export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
};
export const getToken = () => localStorage.getItem('token');
export const getUserRole = () => localStorage.getItem('role');
export const isLoggedIn = () => !!localStorage.getItem('token');
export const isAdmin = () => localStorage.getItem('role') === 'ADMIN';

// Rooms
export const fetchRooms = () => request('/rooms');
export const fetchAvailableRooms = (date) => request(`/rooms/available?date=${date}`);

// Bookings
export const createBooking = (roomId, date, startTime, endTime) => request('/bookings', 'POST', { roomId, date, startTime, endTime });
export const fetchBookings = () => request('/bookings');
export const cancelBooking = (id) => request(`/bookings/${id}`, 'DELETE');

// Admin
export const fetchAllBookings = () => request('/bookings/all');
export const updateBookingStatus = (id, status) => request(`/bookings/${id}/status`, 'PATCH', { status });
