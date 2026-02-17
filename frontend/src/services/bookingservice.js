const API_URL = "http://localhost:5000/api";

export const createBooking = async (bookingData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Booking failed");
  }

  return data;
};

export const getUserBookings = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const cancelBooking = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};