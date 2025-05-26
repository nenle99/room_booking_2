<script>
	import { user } from '$lib/stores/user';
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
	export let data;

	let showMyBookings = false;

	function logout() {
		localStorage.removeItem('user');
		user.set(null);
		goto('/');
	}

	// Gibt alle Buchungen für einen Raum zurück
	function getBookingsForRoom(roomId) {
		return data.bookings.filter((b) => b.room_id === roomId);
	}

	function isRoomAvailable(roomId) {
		const today = new Date().toISOString().split('T')[0];
		const bookingsToday = data.bookings.filter(b => b.room_id === roomId && b.date === today);
		return bookingsToday.length === 0;
	}


	// Buchungen des Nutzers mit Raumdetails
	$: myBookings = data.bookings
		.filter(b => b.user_name === $user.name)
		.map(b => {
			const room = data.rooms.find(r => r._id === b.room_id);
			return {
				...b,
				room
			};
		});

	// Gruppierung der Räume nach Ort
	$: groupedRooms = data.rooms.reduce((acc, room) => {
		const key = room.location;
		if (!acc[key]) acc[key] = [];
		acc[key].push(room);
		return acc;
	}, {});
</script>


<div class="wrapper">
	<div class="header">
		<h1>Verfügbare Räume</h1>
		{#if $user.name}
			<div>
				<button on:click={() => showMyBookings = !showMyBookings}>
					{showMyBookings ? 'Meine Buchungen ausblenden' : 'Meine Buchungen anzeigen'}
				</button>
				<button on:click={logout} class="logout-button">Logout</button>
			</div>
		{/if}
	</div>

	{#if showMyBookings}
		<div class="my-bookings">
			<h2>Meine Buchungen</h2>
			{#if myBookings.length === 0}
				<p>Keine Buchungen vorhanden.</p>
			{:else}
				<ul>
					{#each myBookings as b}
						<li>
							{b.date}, {b.start} – {b.end} in
							<strong>{b.room.name}</strong>
							({b.room.location}, {b.room.capacity} Personen)

							<form method="POST" action="/api/bookings/delete" on:submit={() => setTimeout(() => location.reload(), 100)} style="display:inline;">
							<input type="hidden" name="booking_id" value={b._id} />
							<button type="submit" class="delete-button">Löschen</button>
							</form>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	{#if data.rooms.length === 0}
		<p>Keine Räume vorhanden.</p>
	{:else}
		<div>
			{#each Object.entries(groupedRooms) as [location, rooms]}
				<h2>{location}</h2>
				{#each rooms as room}
					<a class="room-card {isRoomAvailable(room._id) ? 'available' : ''}" href={`/rooms/${room._id}`}>
						<h3>{room.name}</h3>
						<p>Ort: {room.location}</p>
						<p>Kapazität: {room.capacity}</p>

						{#each getBookingsForRoom(room._id) as booking}
							<p class="booking-time">
								{booking.date}: {booking.start} – {booking.end}
							</p>
						{/each}
					</a>
				{/each}
			{/each}
		</div>
	{/if}
</div>

<style>
	.wrapper {
		background-color: #121212;
		color: #f0f0f0;
		min-height: 100vh;
		padding: 2rem;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.room-card {
		display: block;
		border: 1px solid #333;
		border-radius: 8px;
		padding: 1rem;
		margin-bottom: 1rem;
		text-decoration: none;
		color: #f0f0f0;
		background: #1e1e1e;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transition: background 0.2s ease;
	}

	.room-card:hover {
		background: #2a2a2a;
	}

	.room-card.available {
		border: 2px solid #00cc66;
		background-color: #163d2a;
	}

	.booking-time {
		margin-top: 0.5rem;
		color: #bbbbbb;
		font-size: 0.9rem;
	}

	.my-bookings {
		margin-top: 2rem;
		padding: 1rem;
		border-top: 1px solid #333;
		background-color: #1e1e1e;
		border-radius: 8px;
	}

	button {
		background-color: #0070f3;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0059c1;
	}

	.delete-button {
		margin-left: 1rem;
		background-color: #e53935;
		color: white;
		border: none;
		padding: 0.3rem 0.6rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.8rem;
	}

	.delete-button:hover {
		background-color: #c62828;
	}

	.logout-button {
		margin-left: 0.5rem;
		background-color: #444;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.logout-button:hover {
		background-color: #666;
	}
</style>