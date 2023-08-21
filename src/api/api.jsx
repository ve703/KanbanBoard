// src/api/api.js

// ...

export async function fetchTickets() {
  try {
    const response = await fetch(
      'https://api.quicksell.co/v1/internal/frontend-assignment/tickets'
    );
    const data = await response.json();
    return data.tickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.subject,
      priority: ticket.priority,
      status: ticket.status,
      assignedTo: ticket.assigned_to,
      // Add other relevant properties
    }));
  } catch (error) {
    console.error('Error fetching ticket data:', error);
    return [];
  }
}
