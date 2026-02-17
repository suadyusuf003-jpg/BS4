import React from "react";

const BookingCard = ({ booking }) => {
  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h3 className="font-bold text-lg">{booking.room}</h3>
      <p>Date: {booking.date}</p>
      <p>Status: {booking.status}</p>
    </div>
  );
};

export default BookingCard;