require("dotenv").config();




const express = require("express");

const app = express();

app.use(express.json());

const Session = require('express-session');
const FileStore = require('session-file-store')(Session);

app.use(Session({
  store: new FileStore({
    //path: path.join(__dirname, '/tmp'),
    encrypt: true
  }),
  secret: 'Super Secret !',
  resave: true,
  saveUninitialized: true,
  name: 'sessionId'
}));



const port = process.env.APP_PORT ?? 5000;

const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword, verifyToken, } = require("./auth");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { validateUser, validateMovie } = require("./validate");



//routes publiques
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", validateUser, hashPassword, userHandlers.postUser);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken); //mur d'autentification

//routes privées

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);



app.put("/api/users/:id", validateUser, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);








app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});








/*------------------------------------------ sauvegardes ------------------------------------------*/


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

/* const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
}; */

//app.post("/api/login", isItDwight);

//app.post("/api/users", userHandlers.postUser);






//const { hashPassword } = require("./auth.js");