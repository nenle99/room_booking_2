import { json } from '@sveltejs/kit';
import db from '$lib/db.js';

export async function POST({ request }) {
	const formData = await request.formData();
	const id = formData.get('booking_id');

	if (!id) {
		return json({ error: 'Keine Buchungs-ID angegeben' }, { status: 400 });
	}

	try {
		const success = await db.deleteBooking(id);

		if (success) {
			return json({ success: true });
		} else {
			return json({ error: 'Buchung nicht gefunden' }, { status: 404 });
		}
	} catch (error) {
		console.error('Fehler beim Löschen:', error.message);
		return json({ error: 'Serverfehler' }, { status: 500 });
	}
}