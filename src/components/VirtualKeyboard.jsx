import React from 'react';

const keyboardRows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
];

const VirtualKeyboard = ({ letterStatus, currentGuess, setCurrentGuess, handleSubmit }) => {
  const keyStyle = {
    width: '40px',
    height: '60px',
    margin: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '5px',
    boxSizing: 'border-box', // ✅ Prevents overflow
  };

  // Special styling for Enter and Backspace
  const specialKeyStyle = {
    ...keyStyle,
    width: '80px', // ✅ Make Enter and Backspace wider
    fontSize: '14px', // ✅ Reduce font size for better fit
  };

  const getKeyColor = (key) => {
    if (key === 'Enter' || key === 'Backspace') {
      return '#d3d6da'; 
    }
    const status = letterStatus[key.toLowerCase()];
    switch (status) {
      case 'g': return '#6ca965'; // Correct letter, correct position
      case 'y': return '#c8b653'; // Correct letter, wrong position
      case 'b': return '#787c7f'; // Letter not in word
      default: return '#d3d6da';   // Default unguessed letter
    }
  };

  const handleKeyClick = (key) => {
    if (key === 'Enter') {
      if (currentGuess.length === 5) {
        handleSubmit();
      }
    } else if (key === 'Backspace') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(currentGuess + key.toLowerCase());
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', justifyContent: 'center' }}>
          {row.map((key) => {
            const backgroundColor = getKeyColor(key);
            const label = key === 'Backspace' ? '⌫' : key === 'Enter' ? 'ENTER' : key;
            const isSpecialKey = key === 'Enter' || key === 'Backspace';

            return (
              <div
                key={key}
                style={{ ...keyStyle, ...(isSpecialKey ? specialKeyStyle : {}), backgroundColor }}
                onClick={() => handleKeyClick(key)}
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;