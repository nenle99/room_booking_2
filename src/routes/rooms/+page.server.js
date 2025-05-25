import db from '$lib/db.js';

export async function load() {
	const rooms = await db.getRooms();
	const bookings = await db.getBookings();

	return {
		rooms,
		bookings
	};
}