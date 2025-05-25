
<script>
  // Wenn styles.css in src/lib/styles.css liegt:
  import '$lib/styles.css';
</script>

<slot />

<style>
	:global(body) {
		margin: 0;
		background-color: #121212;
		color: #f0f0f0;
		font-family: system-ui, sans-serif;
	}
</style>