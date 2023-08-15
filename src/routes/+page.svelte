<script lang="ts">
	import { category, type CategoryKey } from './category'

	let categories = Object.keys(category) as CategoryKey[]
	let selectedCategory: CategoryKey = 'animals' // default to the first category
	let items = category[selectedCategory].items

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost'

	let state: State = 'start'
	let size: number = 10
	let grid = createGrid()
	let maxMatches = grid.length / 2
	let selected: number[] = []
	let matches: string[] = []
	let timerId: number | null = null
	let DEFAULT_TIME = 600
	let time = DEFAULT_TIME

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

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
			const randomIndex = Math.floor(Math.random() * category[selectedCategory].items.length)
			cards.add(category[selectedCategory].items[randomIndex])
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

	function incrementDifficulty() {
		if (size < 20) {
			size += 2
		}
	}

	function decrementDifficulty() {
		if (size > 4) {
			size -= 2
		}
	}

	function handleSizeChange() {
		if (size % 2 !== 0) {
			alert('Please enter an even number')
			// Reverting back to a valid even size or you can set to a default value.
			size -= 1
		}
		resetGame()
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
</script>

<svelte:window on:keydown={pauseGame} />

{#if state === 'paused'}
	<h1>Game paused</h1>
{/if}

{#if state === 'start'}
	<h1>Matching Game</h1>
	<!-- Let the user select a category -->
	<select bind:value={selectedCategory} on:change={resetGame} class="dropdown">
		{#each Object.keys(category) as categoryKey (categoryKey)}
			<option class="dropdown-content" value={categoryKey}
				>{category[categoryKey].displayName}</option
			>
		{/each}
	</select>
	<!-- Let the user select a difficulty -->
	<div class="difficulty-div">
		<label for="difficulty">Difficulty</label>

		<div class="difficulty-input-div">
			<button class="minus" on:click={decrementDifficulty}>-</button>
			<input type="number" class="difficulty" bind:value={size} on:change={handleSizeChange} />

			<button class="plus" on:click={incrementDifficulty}>+</button>
		</div>
	</div>

	<button class="play-button" on:click={() => (state = 'playing')}>Play</button>
{/if}

{#if state === 'playing'}
	<h1 class="timer" class:pulse={time < 10}>{formatTime(time)}</h1>

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
				class="card button"
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
	<button class="play-button" on:click={() => (state = 'playing')}>Play Again</button>
{/if}

{#if state === 'won'}
	<h1>You Won!</h1>
	<button class="play-button" on:click={() => (state = 'playing')}>Play Again</button>
{/if}
