<script>
	import { onMount } from 'svelte';
	import { user } from '$lib/stores/user';
	import { page } from '$app/stores';

	onMount(() => {
		const stored = localStorage.getItem('user');
		if (stored) {
			user.set(JSON.parse(stored));
		}
	});
</script>

{#if $page.url.pathname !== '/'}
  <nav class="navbar">
    <a href="/rooms">Räume</a>
    <a href="/">Login</a>
  </nav>
{/if}

<main>
  <slot />
</main>
<style>
	:global(body) {
		background-color: #121212;
		color: #ffffff;
		margin: 0;
		font-family: system-ui, sans-serif;
	}

  .navbar {
    background-color: #222;
    padding: 1rem;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  .navbar a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
  }

  .navbar a:hover {
    color: #61dafb;
  }

  main {
    padding-top: 4rem;
  }
</style>