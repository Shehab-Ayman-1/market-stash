import express from "express";

const app = express();
app.use(express.json());

app.get("/api/products", (req, res) => res.status(200).json({ url: req.url, method: req.method }));
app.get("/api/users", (req, res) => res.status(200).json({ url: req.url, method: req.method }));
app.get("/*", (req, res) => res.status(200).json({ url: req.url, method: req.method }));

app.listen(process.env.PORT || 5000);
