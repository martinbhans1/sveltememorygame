<script>
    import AudioPlayer from './AudioPlayer.svelte';
    export let showModal = false;
</script>


<!-- This is a very basic modal. You can style and expand it as needed. -->
<div class="modal" style="display: {showModal ? 'block' : 'none'}">
    <div class="modal-content">
        <h2>Settings</h2>
        <AudioPlayer src="/sounds/card-flip.mp3" />
        <button on:click={() => (showModal = false)}>Close</button>
    </div>
</div>


