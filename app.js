const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const WORD_API = 'https://random-word-api.herokuapp.com/word?length=5';

app.use(express.static('public'));

app.get('/word', async (req, res) => {
  try {
    const response = await axios.get(WORD_API);
    const word = response.data.word.toUpperCase();
    res.send({ word });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Unable to retrieve word' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  createGame();
});
function createGame() {
    const wordContainer = document.querySelector('.word-container');
    const keyboardContainer = document.querySelector('.keyboard-container');
    const guessInput = document.createElement('input');
    guessInput.setAttribute('maxlength', 5);
    guessInput.setAttribute('disabled', true);
    const guessContainer = document.createElement('div');
    guessContainer.classList.add('guess');
    guessContainer.appendChild(guessInput);
    document.body.appendChild(guessContainer);
  
    let word = '';
    let guesses = [];
  
    async function getWord() {
      try {
        const response = await axios.get('/word');
        word = response.data.word;
        console.log(word);
        displayWord();
      } catch (error) {
        console.error(error);
      }
    }

    const numsss = [123, 123]
  
    function displayWord() {
      for (let i = 0; i < word.length; i++) {
        const letterContainer = document.createElement('div');
        letterContainer.classList.add('letter');
        wordContainer.appendChild(letterContainer);
      }
      guessInput.removeAttribute('disabled');
      guessInput.focus();
    }
    
    function checkGuess() {
      const guess = guessInput.value.toUpperCase();
      if (guess.length !== 5) {
        return;
      }
      if (guesses.includes(guess)) {
        return;
      }
      guesses.push(guess);
      guessInput.value = '';
      guessInput.focus();
      displayGuesses();
      displayLetters(guess);
      if (guess === word) {
        endGame(true);
      } else if (guesses.length === 6) {
        endGame(false);
      }
    }
  
    function displayGuesses() {
      guessInput.value = guesses.join(' ');
    }
  
    function displayLetters(guess) {
      const letterContainers = wordContainer.querySelectorAll('.letter');
      for (let i = 0; i < word.length; i++) {
        if (word[i] === guess[i]) {
          letterContainers[i].textContent = guess[i];
          letterContainers[i].classList.add('correct');
        } else if (word.includes(guess[i])) {
          letterContainers[i].classList.add('incorrect');
        }
      }
    }
  
    function endGame(win) {
      guessInput.setAttribute('disabled', true);
      const message = win ? 'You win!' : `You lose. The word was ${word}.`;
      const messageContainer = document.createElement('p');
      messageContainer.textContent = message;
      document.body.appendChild(messageContainer);
      keyboardContainer.removeEventListener('click', handleKeyClick);
    }
  }
  
