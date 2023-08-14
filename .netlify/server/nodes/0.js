

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.128761fb.js","_app/immutable/chunks/scheduler.e9b79cf6.js","_app/immutable/chunks/index.55879b81.js"];
export const stylesheets = ["_app/immutable/assets/0.172d0678.css"];
export const fonts = [];
