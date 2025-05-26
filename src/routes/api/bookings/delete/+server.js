import { redirect } from '@sveltejs/kit';
import db from '$lib/db.js';

export async function POST({ request }) {
	const formData = await request.formData();
	const id = formData.get('booking_id');

	if (!id) {
		throw redirect(303, '/rooms');
	}

	try {
		await db.deleteBooking(id);
		throw redirect(303, '/rooms');
	} catch (error) {
		console.error('Fehler beim Löschen:', error.message);
		throw redirect(303, '/rooms');
	}
}