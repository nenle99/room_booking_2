<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/user.js';

	let name = '';
	let role = '';

	function handleSubmit() {
		if (!name || !role) return;

		user.set({ name, role });
		localStorage.setItem('user', JSON.stringify({ name, role }));
		goto('/rooms');
	}
</script>

<div class="wrapper">
	<div class="form-container">
		<h1>Willkommen im Room Booking Tool</h1>
		<p>Bitte gib deinen Namen und deine Funktion im Unternehmen ein, um fortzufahren.</p>

		<form on:submit|preventDefault={handleSubmit}>
			<label>
				Name:
				<input type="text" bind:value={name} required />
			</label>

			<label>
				Funktion:
				<input type="text" bind:value={role} required />
			</label>

			<button type="submit">Weiter</button>
		</form>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		background-color: #121212;
		color: #f0f0f0;
		font-family: system-ui, sans-serif;
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.form-container {
		background-color: #1e1e1e;
		padding: 2rem;
		border-radius: 10px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
		max-width: 400px;
		width: 100%;
	}

	h1 {
		margin-bottom: 0.5rem;
		color: #ffffff;
	}

	p {
		margin-bottom: 1.5rem;
		color: #cccccc;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
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
</style>