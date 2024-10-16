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
		baseURL: "https://sub-market-stash-client.vercel.app/api",
		...options,
	},
};
