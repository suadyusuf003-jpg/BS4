import React, { useState } from "react";

const Booking = () => {
  const [date, setDate] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking:", { date, room });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Book a Room</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="date"
          className="border p-2 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="">Select Room</option>
          <option value="Room A">Room A</option>
          <option value="Room B">Room B</option>
        </select>

        <button className="bg-purple-500 text-white px-4 py-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;