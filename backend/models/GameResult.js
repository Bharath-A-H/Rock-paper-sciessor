const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameResultSchema = new Schema({
  userChoice: { type: String, required: true },
  computerChoice: { type: String, required: true },
  result: { type: String, required: true },
  userScore: { type: Number, required: true },
  computerScore: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const GameResult = mongoose.model('GameResult', gameResultSchema);
module.exports = GameResult;
