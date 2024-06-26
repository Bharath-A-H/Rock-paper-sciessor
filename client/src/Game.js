import React, { useState } from 'react';
import axios from 'axios';
import './Game.css';

import rockImg from './assets/rock.png';
import paperImg from './assets/paper.png';
import scissorsImg from './assets/scissors.png';

const Game = () => {
    const [userChoice, setUserChoice] = useState('');
    const [computerChoice, setComputerChoice] = useState('');
    const [result, setResult] = useState('');
    const [userScore, setUserScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);

    const choices = [
        { name: 'rock', image: rockImg },
        { name: 'paper', image: paperImg },
        { name: 'scissors', image: scissorsImg }
    ];

    const handleClick = async (choice) => {
        setUserChoice(choice.name);
        try {
            const response = await axios.post('http://localhost:3001/play', { choice: choice.name });
            setComputerChoice(response.data.computerChoice);
            setResult(response.data.result);

            if (response.data.result === 'win') {
                setUserScore(userScore + 1);
            } else if (response.data.result === 'lose') {
                setComputerScore(computerScore + 1);
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div className="game-container">
            <h1>Rock Paper Scissors</h1>
            <div className="choices">
                {choices.map((choice) => (
                    <button key={choice.name} onClick={() => handleClick(choice)} className="choice-button">
                        <img src={choice.image} alt={choice.name} className="choice-image" />
                    </button>
                ))}
            </div>
            <div className="results">
                <h2>Your choice: <span className={`result-${userChoice}`}>{userChoice}</span></h2>
                <h2>Computer's choice: <span className={`result-${computerChoice}`}>{computerChoice}</span></h2>
                <h2>Result: <span className={`result-${result}`}>{result}</span></h2>
                <div className="scores">
                    <h2>Your Score: {userScore}</h2>
                    <h2>Computer Score: {computerScore}</h2>
                </div>
            </div>
        </div>
    );
};

export default Game;
