import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);
await client.connect();

const db = client.db('roombooking');

// ===== ROOMS =====

export async function getRooms() {
	try {
		const rooms = await db.collection('rooms').find({}).toArray();
		rooms.forEach((room) => (room._id = room._id.toString()));
		return rooms;
	} catch (error) {
		console.error('Fehler beim Laden der Räume:', error.message);
		return [];
	}
}

export async function getRoom(id) {
	try {
		const room = await db.collection('rooms').findOne({ _id: new ObjectId(id) });
		if (room) room._id = room._id.toString();
		return room;
	} catch (error) {
		console.error('Fehler beim Laden des Raums:', error.message);
		return null;
	}
}

export async function createRoom(room) {
	try {
		const result = await db.collection('rooms').insertOne(room);
		return result.insertedId.toString();
	} catch (error) {
		console.error('Fehler beim Erstellen eines Raums:', error.message);
		return null;
	}
}

// ===== BOOKINGS =====

export async function createBooking(booking) {
	try {
		const result = await db.collection('bookings').insertOne(booking);
		return result.insertedId.toString();
	} catch (error) {
		console.error('Fehler beim Erstellen der Buchung:', error.message);
		return null;
	}
}

export async function getBookings() {
	try {
		const bookings = await db.collection('bookings').find({}).toArray();
		bookings.forEach((b) => (b._id = b._id.toString()));
		return bookings;
	} catch (error) {
		console.error('Fehler beim Laden der Buchungen:', error.message);
		return [];
	}
}

export async function getBookingsByRoom(roomId) {
	try {
		const bookings = await db
			.collection('bookings')
			.find({ room_id: roomId })
			.toArray();
		bookings.forEach((b) => (b._id = b._id.toString()));
		return bookings;
	} catch (error) {
		console.error('Fehler beim Laden der Buchungen für Raum:', error.message);
		return [];
	}
}

export async function getBookingsByUser(userName) {
	try {
		const bookings = await db
			.collection('bookings')
			.find({ user_name: userName })
			.toArray();
		bookings.forEach((b) => (b._id = b._id.toString()));
		return bookings;
	} catch (error) {
		console.error('Fehler beim Laden der Buchungen für Benutzer:', error.message);
		return [];
	}
}


export async function deleteBooking(id) {
	try {
		console.log('Buchung löschen mit ID:', id);
		const objectId = new ObjectId(id);
		console.log('Erzeugtes ObjectId:', objectId);
		const result = await db.collection('bookings').deleteOne({ _id: objectId });
		return result.deletedCount > 0;
	} catch (error) {
		console.error('Fehler beim Löschen der Buchung:', error.message);
		throw error;
	}
}

// ===== EXPORTS =====

export default {
	getRooms,
	getRoom,
	createRoom,
	getBookings,
	getBookingsByRoom,
	getBookingsByUser,
	createBooking,
	deleteBooking
};