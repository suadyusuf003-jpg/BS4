import { Navigate } from 'react-router-dom';
import { isLoggedIn, isAdmin } from '../services/api.js';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const loggedIn = isLoggedIn();
    const admin = isAdmin();

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !admin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
