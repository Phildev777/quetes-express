require("dotenv").config();



const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword, verifyToken, } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

//routes publiques
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken); //mur d'autentification

//routes privées
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


//app.post("/api/users", userHandlers.postUser);
app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);




/* const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
}; */

//app.post("/api/login", isItDwight);








//const { hashPassword } = require("./auth.js");



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
/* {
  "email": "mymail@theoffice.com",
  "password": "12346"
} */
/* {
        
  "firstname": "Joh",
  "lastname": "Do",
   "email": "mymail@theoffice.com",
  "city": "Paris",
  "language": "English",
  "password": "12346"
} */

/* {
      
  "title": "Lost world",
  "director": "Spielberg",
  "year": "1995",
  "color": "1",
  "duration": 200
} */