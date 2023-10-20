const localhosts = ["http://localhost:5173", "http://localhost:5174"];
const whiteList = ["https://market-stash-client.vercel.app", ...localhosts];

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
