/** @type {import('vite').Plugin} */
const myPlugin = {
	name: 'log-request-middleware',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
            const LOG_REQUEST = process.env.LOG_REQUEST;
            if(parseInt(LOG_REQUEST)==1 && req.url && req.url.startsWith('/src/routes')) {
			    console.log(`Got request ${req.url}`);
            }
			next();
		});
	}
};

export default myPlugin;