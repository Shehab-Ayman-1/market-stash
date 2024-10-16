const localServers = ["http://localhost:5173", "http://localhost:5174", "http://localhost:8001"];
const hosts = ["https://main-market-stash-client.vercel.app"];
const whiteList = hosts.concat(localServers);

export const corsOrigins = {
	origin: (origin, callback) => {
		// origin = undefined -> on localhost
		const isAcceptable = whiteList.some((site) => site === origin);
		if (isAcceptable || origin === undefined) callback(null, origin);
		else callback(`${origin}: Not Allowed By CORS`);
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
