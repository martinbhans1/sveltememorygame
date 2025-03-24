<script>
	import { onMount } from 'svelte';

	export let src = '';
	export let initialVolume = 0.5;
	let audio;

	// Load volume from localStorage or use initial volume
	let storedVolume = parseFloat(localStorage.getItem('gameVolume')) || initialVolume;

	onMount(() => {
		if (typeof window !== 'undefined') {
			audio = new Audio(src);
			audio.volume = storedVolume;  // Set audio volume to storedVolume on mount
		}
	});

	export function play() {
		if (audio) {
			audio.currentTime = 0.15;
			audio.play();
		}
	}

	// Whenever storedVolume changes, reactively update the audio volume and localStorage
	$: {
		if (audio) audio.volume = storedVolume;
		localStorage.setItem('gameVolume', storedVolume);
	}

	function updateVolume(event) {
		// Update storedVolume directly when slider changes
		storedVolume = parseFloat(event.target.value);
	}
</script>

<label>
	Volume:
	<input type="range" min="0" max="1" step="0.01" bind:value={storedVolume} on:input={updateVolume} />
</label>
