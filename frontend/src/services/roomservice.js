const API_URL = "http://localhost:5000/api";

export const getRooms = async () => {
  const response = await fetch(`${API_URL}/rooms`);
  return await response.json();
};

export const getAvailableRooms = async (date) => {
  const response = await fetch(`${API_URL}/rooms/available?date=${date}`);
  return await response.json();
};