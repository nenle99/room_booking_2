<script>
	import { goto } from '$app/navigation';

	function backToRooms() {
		goto('/rooms');
	}
</script>

<div class="confirmation-container">
	<h1>Buchung erfolgreich!</h1>
	<p>Deine Buchung wurde gespeichert.</p>
	<button on:click={backToRooms}>Zurück zur Raumübersicht</button>
</div>

<style>
	.confirmation-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: 100vh;
		background-color: #121212;
		color: #f0f0f0;
		padding: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
	}

	button {
		background-color: #0070f3;
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		transition: background 0.2s ease;
	}

	button:hover {
		background-color: #0059c1;
	}
</style>