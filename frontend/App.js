function fetchRooms() {
  const roomsContainer = document.getElementById("rooms");

  if (!roomsContainer) return;

  // Example dummy rooms
  const rooms = [
    { id: 1, name: "Conference Room A", capacity: 10 },
    { id: 2, name: "Meeting Room B", capacity: 6 },
    { id: 3, name: "Board Room C", capacity: 20 }
  ];

  // Clear container
  roomsContainer.innerHTML = "";

  // Add rooms
  rooms.forEach(room => {
    const roomDiv = document.createElement("div");
    roomDiv.className = "bg-white p-4 rounded shadow";
    roomDiv.innerHTML = `<h3 class="font-bold text-lg">${room.name}</h3>
                         <p>Capacity: ${room.capacity}</p>`;
    roomsContainer.appendChild(roomDiv);
  });
}

// Call fetchRooms on load
document.addEventListener("DOMContentLoaded", fetchRooms);