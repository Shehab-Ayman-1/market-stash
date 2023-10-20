const options = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const routes = {
	locale: {
		baseURL: "http://localhost:5000/api/products",
		...options,
	},
	remote: {
		baseURL: "https://market-stash-server.vercel.app/api/products",
		...options,
	},
};
