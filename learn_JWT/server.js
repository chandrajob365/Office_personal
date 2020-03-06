require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const posts = [
	{
		userName: "Kyle",
		title: "Post 1"
	},
	{
		userName: "Manish",
		title: "Post 2"
	}
];

app.get("/posts", (req, res) => {
	res.json(posts);
});

app.post("/login", (req, res) => {
	// Authenticate user
	console.log("req :: ", req.body);
	const userName = req.body.userName;
	const user = { user: userName };
	const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
	res.json({ accessToken: accessToken });
});
app.listen(4000);
