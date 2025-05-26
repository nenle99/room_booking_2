<script>
	export let data;
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';

	let bookingDate = '';
	let startTime = '';
	let endTime = '';

	// Wandelt Raumnamen in bildfreundliche Dateinamen um
	function slugify(name) {
		return name
			.toLowerCase()
			.replace(/\s+/g, '-')        // Leerzeichen → Bindestriche
			.replace(/[^a-z0-9\-]/g, ''); // Sonderzeichen entfernen
	}

	const imageName = slugify(data.room.name) + '.jpg';
	const imagePath = `/images/rooms/${imageName}`;

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData();
		formData.append('room_id', data.room._id);
		formData.append('user_name', $user.name);
		formData.append('user_role', $user.role);
		formData.append('date', bookingDate);
		formData.append('start', startTime);
		formData.append('end', endTime);

		const res = await fetch('/api/bookings', {
			method: 'POST',
			body: formData
		});

		if (res.ok) {
			goto('/confirmation');
		} else {
			alert('Fehler beim Speichern der Buchung.');
		}
	}
</script>

<div class="wrapper">
	<button class="back-button" on:click={() => goto('/rooms')}>
		← Zurück zur Übersicht
	</button>
	<div class="form-container">
		<img
			src={imagePath}
			alt={`Bild des Raums ${data.room.name}`}
			class="room-image"
			on:error={(e) => e.target.src = '/images/room-placeholder.jpg'}
		/>

		<h1>{data.room.name}</h1>
		<p><strong>Ort:</strong> {data.room.location}</p>
		<p><strong>Kapazität:</strong> {data.room.capacity}</p>

		<h2>Buchung anlegen</h2>

		<form on:submit={handleSubmit}>
			<label>
				Datum:
				<input type="date" bind:value={bookingDate} min={new Date().toISOString().split('T')[0]} required />
			</label>

			<label>
				Startzeit:
				<input type="time" bind:value={startTime} required />
			</label>

			<label>
				Endzeit:
				<input type="time" bind:value={endTime} required />
			</label>

			<button type="submit">Buchen</button>
		</form>
	</div>
</div>

<style>
	.wrapper {
		position: relative;
		min-height: 100vh;
		padding: 2rem;
		background-color: #121212;
		color: #f0f0f0;
	}

	.form-container {
		background-color: #1e1e1e;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		max-width: 400px;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.room-image {
		width: 100%;
		height: auto;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	h1, h2 {
		color: #ffffff;
		margin-bottom: 1rem;
	}

	p {
		margin: 0.5rem 0;
		color: #cccccc;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 2rem;
	}

	label {
		display: flex;
		flex-direction: column;
		font-weight: bold;
	}

	input {
		margin-top: 0.3rem;
		padding: 0.6rem;
		border: none;
		border-radius: 5px;
		background-color: #2a2a2a;
		color: #fff;
	}

	input:focus {
		outline: 2px solid #0070f3;
	}

	button {
		margin-top: 1rem;
		padding: 0.75rem;
		background-color: #0070f3;
		color: white;
		border: none;
		border-radius: 5px;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.2s;
	}

	button:hover {
		background-color: #0059c1;
	}
	.back-button {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background-color: #0070f3;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 5px;
		font-weight: bold;
		cursor: pointer;
		transition: background 0.2s;
		z-index: 1000;
	}

	.back-button:hover {
		background-color: #0059c1;
	}
</style>