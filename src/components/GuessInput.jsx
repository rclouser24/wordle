import React from 'react';

const GuessInput = ({ currentGuess, setCurrentGuess, handleSubmit }) => {
  // Handle input changes: limit to 5 characters and convert to uppercase
  const handleChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 5) {
      setCurrentGuess(value);
    }
  };

  // Handle Enter key press: submit guess if it's 5 letters
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && currentGuess.length === 5) {
      handleSubmit();
    }
  };

  return (
    <input
      type="text"
      value={currentGuess}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      maxLength={5}
      style={{
        fontSize: '24px',
        textAlign: 'center',
        padding: '10px',
        marginTop: '20px',
        width: '150px',
      }}
    />
  );
};

export default GuessInput;