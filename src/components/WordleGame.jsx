import React, { useState, useEffect } from 'react';
import { fetchWords } from '../utils/Word-Fetcher';
import { Wordle } from '../utils/Wordle';
import GuessGrid from './GuessGrid';
import GuessInput from './GuessInput';
import VirtualKeyboard from './VirtualKeyboard';

const statusPriority = { 'g': 2, 'y': 1, 'b': 0 };

const WordleGame = () => {
  const [wordList, setWordList] = useState([]);
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState('playing');
  const [letterStatus, setLetterStatus] = useState({});

  useEffect(() => {
    const loadWords = async () => {
      const words = await fetchWords();
      setWordList(words);
      if (words.length > 0) {
        const randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
        setTargetWord(randomWord);
      }
    };
    loadWords();
  }, []);

  const handleGuessSubmit = () => {
    const guess = currentGuess.toLowerCase();
    if (guess.length !== 5 || !wordList.includes(guess)) {
      console.log('Invalid guess: must be a 5-letter word from the list');
      return;
    }
    const wordle = new Wordle(targetWord);
    const result = wordle.checkWord(guess);
    const newGuesses = [...guesses, { word: guess, result }];
    setGuesses(newGuesses);

    // Update letterStatus
    const newLetterStatus = { ...letterStatus };
    for (let i = 0; i < 5; i++) {
      const letter = guess[i];
      const status = result[i];
      if (!newLetterStatus[letter] || statusPriority[status] > statusPriority[newLetterStatus[letter]]) {
        newLetterStatus[letter] = status;
      }
    }
    setLetterStatus(newLetterStatus);

    if (guess === targetWord) {
      setGameStatus('won');
    } else if (newGuesses.length >= 6) {
      setGameStatus('lost');
    }
    setCurrentGuess('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Wordle Clone</h1>
      <GuessGrid guesses={guesses} currentGuess={currentGuess} />
      {gameStatus === 'playing' ? (
        <VirtualKeyboard
          letterStatus={letterStatus}
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          handleSubmit={handleGuessSubmit}
        />
      ) : (
        <div>
          <p>{gameStatus === 'won' ? 'You won!' : 'You lost!'}</p>
          {gameStatus === 'lost' && <p>The word was: {targetWord.toUpperCase()}</p>}
        </div>
      )}
    </div>
  );
};

export default WordleGame;