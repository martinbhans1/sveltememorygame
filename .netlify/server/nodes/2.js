

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.744c09df.js","_app/immutable/chunks/scheduler.e9b79cf6.js","_app/immutable/chunks/index.55879b81.js"];
export const stylesheets = ["_app/immutable/assets/2.67b2a6ac.css"];
export const fonts = [];
