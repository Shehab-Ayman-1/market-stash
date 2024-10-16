const options = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const routes = {
	locale: {
		baseURL: "http://localhost:5000/api",
		...options,
	},
	remote: {
		baseURL: "https://main-market-stash-server.vercel.app/api",
		...options,
	},
};
