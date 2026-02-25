import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-3">
        <li>
          <Link to="/admin" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/booking" className="hover:text-gray-300">
            Manage Bookings
          </Link>
        </li>
        <li>
          <Link to="/" className="hover:text-gray-300">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;