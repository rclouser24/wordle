import React from 'react';

const GuessGrid = ({ guesses, currentGuess }) => {
  const cellStyle = {
    width: '50px',
    height: '50px',
    margin: '5px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    border: '1px solid #ccc',
  };

  const getColor = (result) => {
    switch (result) {
      case 'g': return { backgroundColor: '#6ca965', color: 'white' };
      case 'y': return { backgroundColor: '#c8b653', color: 'white' }; 
      case 'b': return { backgroundColor: '#787c7f', color: 'white' };
      default: return { backgroundColor: 'white', color: 'black' };
    }
  };

  return (
    <div>
      {Array(6).fill(null).map((_, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {Array(5).fill(null).map((_, colIndex) => {
            if (rowIndex < guesses.length) {
              const guess = guesses[rowIndex];
              const letter = guess.word[colIndex].toUpperCase();
              const result = guess.result[colIndex];
              const style = { ...cellStyle, ...getColor(result) };
              return <div key={colIndex} style={style}>{letter}</div>;
            } else if (rowIndex === guesses.length) {
              const letter = colIndex < currentGuess.length ? currentGuess[colIndex].toUpperCase() : '';
              const style = { ...cellStyle, backgroundColor: letter ? '#e0e0e0' : 'white', color: 'black' };
              return <div key={colIndex} style={style}>{letter}</div>;
            } else {
              return <div key={colIndex} style={{ ...cellStyle, backgroundColor: 'white' }}></div>;
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default GuessGrid;