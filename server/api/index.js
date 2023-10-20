import serverless from "serverless-http";
import { app } from "../server.js";

const handler = serverless(app);

export default async (req, res) => {
	handler(req, res);
};