const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const GameResult = require('./models/GameResult'); 

const app = express();
const port = 3001;
// Enable CORS for all routes
app.use(cors()); 
app.use(express.json()); 

// Array of possible choices
const choices = ['rock', 'paper', 'scissors']; 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rpsgame', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Rock Paper Scissors Game API'); 
});

// Route to instruct how to play the game
app.get('/play', (req, res) => {
    res.send('Use POST method to play the game by sending your choice in the request body.');
});

// Route to fetch the latest 10 game results
app.get('/history', (req, res) => {
    GameResult.find().sort({ date: -1 }).limit(10) 
        .then(results => res.json(results)) 
        .catch(err => res.status(500).json({ success: false, error: err.message })); 
});

// Route to play the game - expects user's choice in request body
app.post('/play', (req, res) => {
    const userChoice = req.body.choice; 
    const computerChoice = choices[Math.floor(Math.random() * choices.length)]; 

    let result = '';
    let userScore = 0;
    let computerScore = 0;

    // Determine the game result
    if (userChoice === computerChoice) {
        result = 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'win';
        userScore = 1; 
    } else {
        result = 'lose';
        computerScore = 1; 
    }

    // Create a new GameResult document
    const gameResult = new GameResult({
        userChoice,
        computerChoice,
        result,
        userScore,
        computerScore
    });

    // Save the game result to MongoDB
    gameResult.save()
        .then(() => res.json({ userChoice, computerChoice, result, userScore, computerScore }))
        .catch(err => res.status(500).json({ success: false, error: err.message })); 
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); 
});
