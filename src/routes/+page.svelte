<script lang="ts">
	import type { ActionData } from "./$types"
	import { enhance } from "$app/forms"
	import { sveporuke } from "$lib/stores/sveporuke"
	import Icon from "@iconify/svelte"
	import { fly } from "svelte/transition"
	import { v4 as uuidv4 } from "uuid"

	export let form: ActionData

	let inputvalue: string

	let oldform: any
	let waiting: boolean
	let htmldiv: HTMLDivElement

	$: if (!form?.greska) {
		if (form && form != oldform) {
			waiting = false
			$sveporuke.push(form)
			$sveporuke = $sveporuke

			oldform = form
		}
	} else {
		$sveporuke = []
		console.log(form.greska)
	}

	function scrollToBottom() {
		setTimeout(() => {
			htmldiv.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
		}, 100)
	}

	async function dodajPorukuKorisnika() {
		$sveporuke.push({ role: "user", content: inputvalue, id: uuidv4() })
		inputvalue = ""
		$sveporuke = $sveporuke
		waiting = true
		scrollToBottom()
	}
</script>

<div class="razgovorwrapper">
	<div class="razgovor">
		{#each $sveporuke as { role, content }}
			<div transition:fly={{ x: -400 }} class="poruka">
				<h3>{role}</h3>
				<p>{content}</p>
			</div>
		{/each}
		{#if form?.greska}
			<div in:fly={{ x: -400, delay: 200 }} class="poruka porukawait">
				<h3>GREŠKA!</h3>
				Moraš unijeti svoj API ključ!
			</div>
		{:else if waiting}
			<div in:fly={{ x: -400, delay: 200 }} class="poruka porukawait">
				<h3>assistant</h3>
				<Icon icon="line-md:loading-twotone-loop" />
			</div>
		{/if}
		<div bind:this={htmldiv} />
	</div>
	<div class="formwrapper">
		<form use:enhance method="POST" on:submit={dodajPorukuKorisnika}>
			<input type="text" name="pitanje" bind:value={inputvalue} required minlength="5" />
			<button type="submit"><Icon icon="material-symbols:send" /></button>
		</form>
	</div>
</div>
