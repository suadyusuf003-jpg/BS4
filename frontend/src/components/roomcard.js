import React from "react";

const RoomCard = ({ room, onBook }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h2 className="text-xl font-bold">{room.name}</h2>
      <p>Capacity: {room.capacity}</p>

      <button
        onClick={() => onBook(room)}
        className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Book Room
      </button>
    </div>
  );
};

export default RoomCard;