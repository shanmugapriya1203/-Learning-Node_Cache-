const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const dbConfig = require("./db");
const User = require("./usermodel");

dbConfig();
const app = express();

const myCache = new NodeCache();
const port = 3000;

app.use(express.json()); //

const api = "https://jsonplaceholder.typicode.com/users/";
app.get("/users/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const response = await axios.get(api);
    const users = response.data.filter((user) => user.email == email);
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      console.log("User(s) successfully retrieved from the API");
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send(err);
  }
});
app.get("/users", async (req, res) => {
  try {
    let users;
    if (myCache.has("userData")) {
      users = JSON.parse(myCache.get("userData"));
    } else {
      users = await User.find();
      myCache.set("userData", JSON.stringify(users));
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/newusers", async (req, res) => {
  try {
    const response = await axios.get(api);
    let users = response.data;
    for (let i = 0; i < users.length; i++) {
      const newUsers = await User.insertMany({
        name: users[i]?.name,
        username: users[i]?.username,
        email: users[i]?.email,
      });
    }
    res.status(201).json({ message: "Created" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.put("/update", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.query.id,
      { ...req.body },
      { new: true }
    );
    myCache.del("userData");
    res.status(200).json({ updateUser });
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} `);
});
