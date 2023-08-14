import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "sveltememorygame.github.io/_app",
	assets: new Set([".nojekyll","favicon.png","images/bjarnis.jpg","images/blippi.jpg","images/carl.jpg","images/fantus.jpg","images/gecko.jpg","images/jj.jpg","images/leo.jpg","images/meekah.jpg","images/mrmonkey.jpg","images/teletubbies.jpg"]),
	mimeTypes: {".png":"image/png",".jpg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.816b662e.js","app":"_app/immutable/entry/app.7b3aa268.js","imports":["_app/immutable/entry/start.816b662e.js","_app/immutable/chunks/scheduler.e9b79cf6.js","_app/immutable/chunks/singletons.3095df3e.js","_app/immutable/entry/app.7b3aa268.js","_app/immutable/chunks/scheduler.e9b79cf6.js","_app/immutable/chunks/index.55879b81.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
