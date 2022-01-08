// Express is already installed
const express = require("express");
// Array of movies
const movies = require("./movies");
// In codesandbox we need to use the default port which is 8080
const port = 8080;

const app = express();

// 1 - route: "/"
app.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

// 2 - route: "/api/movies"
app.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});

// 3 - route: "/api/movies/:id"
app.get("/api/movies/:id", (req, res) => {
  const id = req.params.id;
  const found = movies.find((el) => el.id.toString() === id);
  found === undefined
    ? res.status(404).send("Not found")
    : res.status(200).json(movies[id]);
});

/* IF - ELSE solution
  const found = movies.find((el) => el.id.toString() === id);
  if (found === undefined) {
    res.status(404).send("Not found");
  } else {
    res.status(200).json(movies[id]);
  }
  */

// 4 - route "api/search" (/api/search?maxDuration=130)

app.get("/api/search", (req, res) => {
  const maxDuration = Number(req.query.maxDuration);
  const filteredMovies = movies.filter(
    (movie) => movie.duration <= maxDuration
  );

  filteredMovies.length === 0
    ? res.status(404).send("No movies found for this duration.")
    : res.status(200).json(filteredMovies);
  res.send(req.query.maxDuration);
});

// 5 - route "/api/users"

app.get("/api/users", (req, res) => {
  res.status(401).send("unauthorized");
});

// listen to server

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
