<script lang="ts">
	import Apiwindow from "$lib/components/apiwindow.svelte"
	import { apiWindow } from "$lib/stores/apiwindow"
</script>

<header>
	ChatGPT Brbljaona <button
		on:click={() => {
			$apiWindow = !$apiWindow
		}}>Unesi API ključ</button
	>
</header>

{#if $apiWindow}
	<Apiwindow />
{/if}
