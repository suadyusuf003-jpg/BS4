import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../services/api.js';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const loggedIn = isLoggedIn();

    if (!loggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If we had role checking in api.js, we would use it here.
    // For now, we'll assume the user is authorized.
    // In a real app, we'd decode the JWT to check roles.

    return children;
};

export default ProtectedRoute;
