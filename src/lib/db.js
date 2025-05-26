import { MongoClient, ObjectId } from 'mongodb';
import { DB_URI } from '$env/static/private';

const client = new MongoClient(DB_URI);
await client.connect();

const db = client.db('roombooking');


// Lädt alle Räume aus der Datenbank und gibt sie als Array zurück
export async function getRooms() {
	try {
		const rooms = await db.collection('rooms').find({}).toArray();


		// Konvertiert die MongoDB ObjectId in einen String für die weitere Verwendung
		rooms.forEach((room) => (room._id = room._id.toString()));
		return rooms;
	} catch (error) {
		console.error('Fehler beim Laden der Räume:', error.message);
		return [];
	}
}

// Lädt einen einzelnen Raum basierend auf der übergebenen ID
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


// Erstellt eine neue Buchung und gibt deren ID zurück
export async function createBooking(booking) {
	try {
		const result = await db.collection('bookings').insertOne(booking);
		return result.insertedId.toString();
	} catch (error) {
		console.error('Fehler beim Erstellen der Buchung:', error.message);
		return null;
	}
}

// Lädt alle Buchungen aus der Datenbank
export async function getBookings() {
	try {
		const bookings = await db.collection('bookings').find({}).toArray();

		
		// Konvertiert die MongoDB ObjectId in einen String für die weitere Verwendung
		bookings.forEach((b) => (b._id = b._id.toString()));
		return bookings;
	} catch (error) {
		console.error('Fehler beim Laden der Buchungen:', error.message);
		return [];
	}
}

// Lädt alle Buchungen für einen bestimmten Raum anhand der Raum-ID
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

// Lädt alle Buchungen, die von einem bestimmten Benutzer gemacht wurden
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

// Löscht eine Buchung anhand ihrer ID aus der Datenbank
export async function deleteBooking(id) {
	try {
		console.log('Buchung löschen mit ID:', id);
		// Wandelt die ID in eine MongoDB ObjectId um
		const objectId = new ObjectId(id);
		console.log('Erzeugtes ObjectId:', objectId);
		const result = await db.collection('bookings').deleteOne({ _id: objectId });
		return result.deletedCount > 0;
	} catch (error) {
		console.error('Fehler beim Löschen der Buchung:', error.message);
		throw error;
	}
}


export default {
	getRooms,
	getRoom,
	getBookings,
	getBookingsByRoom,
	getBookingsByUser,
	createBooking,
	deleteBooking
};