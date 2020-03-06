const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());
const users = [];
app.get("/users", (req, res) => {
	res.json(users);
});

app.post("/users", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPwd = await bcrypt.hash(req.body.password, salt);
		console.log(salt);
		console.log(hashedPwd);
		const user = { name: req.body.userName, password: hashedPwd };
		users.push(user);
		res.status(201).send();
	} finally {
	}
});

app.post("/users/login", async (req, res) => {
	const user = users.find(user => user.name === req.body.userName);
	if (user === null) {
		return res.status(400).send("Cann't find user");
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.send("Success");
		} else {
			res.send("Not allow");
		}
	} catch {
		res.status(500).send();
	}
});
app.listen(3003);
