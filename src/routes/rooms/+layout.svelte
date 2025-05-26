<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';

	onMount(() => {
		const stored = localStorage.getItem('user');
		if (stored) {
			user.set(JSON.parse(stored));
		}
	});
</script>

<slot />
<style>
	:global(body) {
		background-color: #121212;
		color: #ffffff;
		margin: 0;
		font-family: system-ui, sans-serif;
	}
</style>