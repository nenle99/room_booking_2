import db from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	return {
		room: await db.getRoom(params.room_id)
	};
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id');

		await db.deleteRoom(id);

		throw redirect(303, '/rooms');
	}
};