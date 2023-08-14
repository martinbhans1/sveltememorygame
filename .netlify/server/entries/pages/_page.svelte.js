import { c as create_ssr_component, d as each, e as escape, f as add_attribute } from "../../chunks/ssr.js";
const category = {
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐻‍❄️",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐽",
    "🐸",
    "🐵",
    "🙈",
    "🙉",
    "🙊",
    "🐒",
    "🐔",
    "🐧",
    "🐦",
    "🐤",
    "🐣",
    "🐥",
    "🦆",
    "🦅",
    "🦉",
    "🦇",
    "🐺",
    "🐗",
    "🐴",
    "🦄",
    "🐝",
    "🪱",
    "🐛",
    "🦋",
    "🐌",
    "🐞",
    "🐜",
    "🪰",
    "🪲",
    "🪳",
    "🦟",
    "🦗",
    "🕷",
    "🦂",
    "🐢",
    "🐍",
    "🦖",
    "🦕",
    "🐙",
    "🦑",
    "🦐",
    "🦞",
    "🦀",
    "🪸",
    "🐡",
    "🐠",
    "🐟",
    "🐬",
    "🐳",
    "🐋",
    "🦈",
    "🐊",
    "🐅",
    "🐆",
    "🦓",
    "🦍",
    "🦧",
    "🦣",
    "🐘",
    "🦛",
    "🦏",
    "🐪",
    "🐫",
    "🦒",
    "🦘",
    "🦬",
    "🐃",
    "🐂",
    "🐄",
    "🐎",
    "🐖",
    "🐏",
    "🐑",
    "🦙",
    "🐐",
    "🦌",
    "🐕",
    "🐩",
    "🦮",
    "🐕‍🦺",
    "🐈",
    "🐈‍⬛",
    "🐓",
    "🦃",
    "🦤",
    "🦚",
    "🦜",
    "🦢",
    "🦩",
    "🐇",
    "🦝",
    "🦨",
    "🦡",
    "🦫",
    "🦦",
    "🦥",
    "🐁",
    "🐀",
    "🐿",
    "🦔"
  ],
  food: [
    "🍎",
    "🍐",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🫐",
    "🍈",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🥦",
    "🥒",
    "🌽",
    "🥕",
    "🥔",
    "🥐",
    "🥯",
    "🍞",
    "🥖",
    "🥨",
    "🧀",
    "🥚",
    "🥞",
    "🥓",
    "🥩",
    "🌭",
    "🍔",
    "🍟",
    "🍕"
  ],
  noahCelebs: [
    "/images/bjørnis.jpg",
    "/images/blippi.jpg",
    "/images/meekah.jpg",
    "/images/carl.jpg",
    "/images/fantus.jpg",
    "/images/gecko.jpg",
    "/images/leo.jpg",
    "/images/mrmonkey.jpg",
    "/images/teletubbies.jpg"
  ]
};
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".cards.svelte-13bvhm8{display:grid;grid-template-columns:repeat(5, 1fr);gap:0.4rem}.card.svelte-13bvhm8{height:140px;width:140px;font-size:4rem;background-color:var(--bg-2);transition:rotate 0.5s ease-out;transform-style:preserve-3d;&.selected {\n			border: 4px solid var(--border);\n		};&.flip {\n			rotate: y 180deg;\n			pointer-events: none;\n		};& .back {\n			position: absolute;\n			inset: 0;\n			display: grid;\n			place-content: center;\n			backface-visibility: hidden;\n			rotate: y 180deg;\n		};&.match {\n			transition: opacity 0.3s ease-out;\n			opacity: 0.4;\n		}}.matches.svelte-13bvhm8{display:flex;gap:1rem;margin-block:2rem;font-size:3rem}.timer.svelte-13bvhm8{transition:color 0.3s ease}.pulse.svelte-13bvhm8{color:var(--pulse);animation:svelte-13bvhm8-pulse 1s infinite}.dropdown.svelte-13bvhm8{margin-bottom:6rem;margin-top:3rem;padding:0.5rem;text-align:center;font-size:2rem;font-weight:bold}@keyframes svelte-13bvhm8-pulse{to{scale:1.4}}",
  map: null
};
let size = 10;
let DEFAULT_TIME = 600;
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories = Object.keys(category);
  let selectedCategory = "animals";
  let state = "start";
  let grid = createGrid();
  let maxMatches = grid.length / 2;
  let selected = [];
  let matches = [];
  let timerId = null;
  let time = DEFAULT_TIME;
  function startGameTimer() {
    function countdown() {
      state != "paused" && (time -= 1);
    }
    timerId = setInterval(countdown, 1e3);
  }
  function createGrid() {
    let cards = /* @__PURE__ */ new Set();
    let maxSize = size / 2;
    while (cards.size < maxSize) {
      const randomIndex = Math.floor(Math.random() * category[selectedCategory].length);
      cards.add(category[selectedCategory][randomIndex]);
    }
    return shuffle([...cards, ...cards]);
  }
  function matchCards() {
    const [first, second] = selected;
    if (grid[first] === grid[second]) {
      matches = matches.concat(grid[first]);
    }
    setTimeout(() => selected = [], 500);
  }
  function resetGame() {
    timerId && clearInterval(timerId);
    grid = createGrid();
    maxMatches = grid.length / 2;
    selected = [];
    matches = [];
    timerId = null;
    time = DEFAULT_TIME;
  }
  function gameWon() {
    state = "won";
    resetGame();
  }
  function gameLost() {
    state = "lost";
    resetGame();
  }
  $$result.css.add(css);
  {
    if (state === "playing") {
      !timerId && startGameTimer();
    }
  }
  selected.length === 2 && matchCards();
  maxMatches === matches.length && gameWon();
  time === 0 && gameLost();
  {
    {
      grid = createGrid();
    }
  }
  {
    console.log({ state, selected, matches });
  }
  {
    console.log("Selected category: ", selectedCategory);
  }
  return ` ${state === "paused" ? `<h1 data-svelte-h="svelte-8ugaie">Game paused</h1>` : ``} ${state === "start" ? `<h1 data-svelte-h="svelte-g27ruz">Matching Game</h1>  <select class="dropdown svelte-13bvhm8">${each(categories, (category2) => {
    return `<option${add_attribute("value", category2, 0)}>${escape(category2)}</option>`;
  })}</select> <button data-svelte-h="svelte-13iwojh">Start</button>` : ``} ${state === "playing" ? `<h1 class="${["timer svelte-13bvhm8", time < 10 ? "pulse" : ""].join(" ").trim()}">${escape(time)}</h1> <div class="matches svelte-13bvhm8">${each(matches, (match) => {
    return `<div>${match.startsWith("/images/") ? `<img${add_attribute("src", match, 0)} alt="" width="120" height="120">` : `${escape(match)}`} </div>`;
  })}</div> <div class="cards svelte-13bvhm8">${each(grid, (card, cardIndex) => {
    let isSelected = selected.includes(cardIndex), isSelectedOrMatch = selected.includes(cardIndex) || matches.includes(card);
    matches.includes(card);
    return `   <button class="${[
      "card svelte-13bvhm8",
      (isSelected ? "selected" : "") + " " + (isSelectedOrMatch ? "flip" : "")
    ].join(" ").trim()}" ${isSelectedOrMatch ? "disabled" : ""}><div class="back">${card.startsWith("/images/") ? `<img${add_attribute("src", card, 0)} alt="" width="120" height="120">` : `${escape(card)}`}</div> </button>`;
  })}</div>` : ``} ${state === "lost" ? `<h1 data-svelte-h="svelte-git627">You Lost</h1> <button data-svelte-h="svelte-fkq21b">Play Again</button>` : ``} ${state === "won" ? `<h1 data-svelte-h="svelte-2qbe76">You Won!</h1> <button data-svelte-h="svelte-fkq21b">Play Again</button>` : ``}`;
});
export {
  Page as default
};
