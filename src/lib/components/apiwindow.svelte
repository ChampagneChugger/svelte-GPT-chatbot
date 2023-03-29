<script lang="ts">
	import { apiWindow } from "$lib/stores/apiwindow"

	let inputv: string

	function postaviKljuc() {
		document.cookie = "api_kljuc=" + inputv
		$apiWindow = false
		window.location.href = "/"
	}
</script>

<div class="apiw">
	<label for="apikljuc">
		<input
			type="text"
			name="apikljuc"
			minlength="5"
			placeholder="Tvoj API ključ"
			bind:value={inputv}
		/>
		<div class="buttonwrap">
			<button on:click={postaviKljuc}>Postavi ključ</button>
			<button
				on:click={() => {
					$apiWindow = false
				}}>Odustani</button
			>
		</div>
		<a href="https://platform.openai.com/account/api-keys" target="_blank">Zatraži svoj ključ</a>
	</label>
</div>
