const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const choices = ['rock', 'paper', 'scissors'];


app.get('/', (req, res) => {
    res.send('Welcome to the Rock Paper Scissors Game API');
});


app.get('/play', (req, res) => {
    res.send('Use POST method to play the game by sending your choice in the request body.');
});


app.post('/play', (req, res) => {
    const userChoice = req.body.choice;
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    let result = '';

    if (userChoice === computerChoice) {
        result = 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
    } else {
        result = 'lose';
    }

    res.json({ userChoice, computerChoice, result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
