

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.84494575.js","_app/immutable/chunks/scheduler.e9b79cf6.js","_app/immutable/chunks/index.55879b81.js","_app/immutable/chunks/singletons.90b43804.js"];
export const stylesheets = [];
export const fonts = [];
