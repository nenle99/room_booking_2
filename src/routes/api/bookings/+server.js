import db from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const formData = await request.formData();

	const booking = {
		room_id: formData.get('room_id'),
		user_name: formData.get('user_name'),
		user_role: formData.get('user_role'),
		date: formData.get('date'),
		start: formData.get('start'),
		end: formData.get('end')
	};

	try {
		await db.createBooking(booking);
		return json({ success: true });
	} catch (error) {
		console.error('Fehler beim Speichern:', error.message);
		return json({ success: false }, { status: 500 });
	}
}