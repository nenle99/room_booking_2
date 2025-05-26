import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import db from '$lib/db.js';

export async function POST({ request }) {
	const data = await request.formData();
	const id = data.get('booking_id');
	await db.deleteBooking(id);
	throw redirect(303, '/rooms');
}