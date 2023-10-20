import serverless from "serverless-http";
import { app } from "../server";

const handler = serverless(app);

export default async (req, res) => {
	await handler(req, res);
};
