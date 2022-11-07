require("dotenv").config();

const express = require("express");


const app = express();
app.use(express.json());//à mettre tout le temps pour json

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);
const usersHandlers = require("./usersHandlers");

app.get("/api/users/", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);
//quête express 03
app.post("/api/users", usersHandlers.postUser);
//quête express 04
app.put("/api/users/:id", usersHandlers.updateUser);
//quête express 05
app.delete("/api/users/:id", usersHandlers.deleteUser);

const movieHandlers = require("./movieHandlers");
const { application } = require("express");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

app.post("/api/movies", movieHandlers.postMovie);