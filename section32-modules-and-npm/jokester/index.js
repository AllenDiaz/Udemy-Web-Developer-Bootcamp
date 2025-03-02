const jokes = require("give-me-a-joke")
const colors = require("colors");
const cowsays = require('cowsay')

console.dir(jokes)
jokes.getRandomDadJoke(function (joke) {
    console.log(joke.rainbow);
})