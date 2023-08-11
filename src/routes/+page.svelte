<script lang="ts">
	import { category, type CategoryKey } from './category'

	let categories = Object.keys(category) // This will give us ["animals", "celebrities", ...]
	let selectedCategory: CategoryKey = 'animals' // default to the first category

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost'

	let state: State = 'start'
	let size = 10
	let grid = createGrid()
	let maxMatches = grid.length / 2
	let selected: number[] = []
	let matches: string[] = []
	let timerId: number | null = null
    let DEFAULT_TIME = 600
	let time = DEFAULT_TIME

	function startGameTimer() {
		function countdown() {
			state != 'paused' && (time -= 1)
		}

		timerId = setInterval(countdown, 1000)
	}

	function createGrid() {
		let cards = new Set<string>()
		let maxSize = size / 2

		while (cards.size < maxSize) {
			const randomIndex = Math.floor(Math.random() * category[selectedCategory].length)
			cards.add(category[selectedCategory][randomIndex])
		}

		return shuffle([...cards, ...cards])
	}

	// function createGrid() {
	//     let cards = new Set<string>()
	//     let maxSize = size / 2

	//     while (cards.size < maxSize) {
	//         const randomIndex = Math.floor(Math.random() * category.length)
	//         cards.add(category[randomIndex])
	//     }

	//     return shuffle([...cards, ...cards])
	// }

	function shuffle<Items>(array: Items[]) {
		return array.sort(() => Math.random() - 0.5)
	}

	function selectCard(cardIndex: number) {
		selected = selected.concat(cardIndex)
	}

	function matchCards() {
		const [first, second] = selected

		if (grid[first] === grid[second]) {
			matches = matches.concat(grid[first])
		}

		setTimeout(() => (selected = []), 500)
	}

	function resetGame() {
		timerId && clearInterval(timerId)
		grid = createGrid()
		maxMatches = grid.length / 2
		selected = []
		matches = []
		timerId = null
		time = DEFAULT_TIME
	}

	function gameWon() {
		state = 'won'
		resetGame()
	}

	function gameLost() {
		state = 'lost'
		resetGame()
	}

	function pauseGame(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			switch (state) {
				case 'playing':
					state = 'paused'
					break
				case 'paused':
					state = 'playing'
					break
			}
		}
	}

	$: if (state === 'playing') {
		!timerId && startGameTimer()
	}

	$: selected.length === 2 && matchCards()
	$: maxMatches === matches.length && gameWon()
	$: time === 0 && gameLost()
	$: if (selectedCategory) {
		grid = createGrid()
	}

	$: console.log({ state, selected, matches })
	$: console.log('Selected category: ', selectedCategory)
</script>

<svelte:window on:keydown={pauseGame} />

{#if state === 'paused'}
	<h1>Game paused</h1>
{/if}

{#if state === 'start'}
	<h1>Matching Game</h1>
	<!-- Let the user select a category -->
	<select bind:value={selectedCategory} on:change={resetGame} class="dropdown">
		{#each categories as category}
			<option value={category}>{category}</option>
		{/each}
	</select>
	<button on:click={() => (state = 'playing')}>Start</button>
{/if}

{#if state === 'playing'}
	<h1 class="timer" class:pulse={time < 10}>{time}</h1>

	<div class="matches">
		{#each matches as match}
			<div>
				{#if match.startsWith('/images/')}
					<img src={match} alt="" width="120" height="120" />
				{:else}
					{match}
				{/if}
			</div>
		{/each}
	</div>

	<div class="cards">
		{#each grid as card, cardIndex}
			{@const isSelected = selected.includes(cardIndex)}
			{@const isSelectedOrMatch = selected.includes(cardIndex) || matches.includes(card)}
			{@const match = matches.includes(card)}

			<button
				class="card"
				class:selected={isSelected}
				class:flip={isSelectedOrMatch}
				disabled={isSelectedOrMatch}
				on:click={() => selectCard(cardIndex)}
			>
				<div class="back">
					{#if card.startsWith('/images/')}
						<img src={card} alt="" width="120" height="120" />
					{:else}
						{card}
					{/if}
				</div>
			</button>
		{/each}
	</div>
{/if}

{#if state === 'lost'}
	<h1>You Lost</h1>
	<button on:click={() => (state = 'playing')}>Play Again</button>
{/if}

{#if state === 'won'}
	<h1>You Won!</h1>
	<button on:click={() => (state = 'playing')}>Play Again</button>
{/if}

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	.card {
		height: 140px;
		width: 140px;
		font-size: 4rem;
		background-color: var(--bg-2);
		transition: rotate 0.5s ease-out;
		transform-style: preserve-3d;

		&.selected {
			border: 4px solid var(--border);
		}

		&.flip {
			rotate: y 180deg;
			pointer-events: none;
		}

		& .back {
			position: absolute;
			inset: 0;
			display: grid;
			place-content: center;
			backface-visibility: hidden;
			rotate: y 180deg;
		}

		&.match {
			transition: opacity 0.3s ease-out;
			opacity: 0.4;
		}
	}

	.matches {
		display: flex;
		gap: 1rem;
		margin-block: 2rem;
		font-size: 3rem;
	}

	.timer {
		transition: color 0.3s ease;
	}

	.pulse {
		color: var(--pulse);
		animation: pulse 1s infinite;
	}

	.dropdown {
		margin-bottom: 6rem;
		margin-top: 3rem;
		padding: 0.5rem;
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
	}

	@keyframes pulse {
		to {
			scale: 1.4;
		}
	}
</style>
