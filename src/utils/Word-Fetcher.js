const WORD_LIST = 'https://raw.githubusercontent.com/axlrommel/wordle/main/fiveLetterWords.js';

const fetchWords = async () => {
    try {
        const response = await fetch(WORD_LIST);
        if (!response.ok) {
            throw new Error(`Failed to fetch word list: ${response.statusText}`);
        }
        
        const text = await response.text(); 
        console.log("Raw file content:", text);
     
        const match = text.match(/\[([\s\S]*?)\]/);
        if (!match) throw new Error("Word list not found in JS file");

        const words = JSON.parse(`[${match[1]}]`); 
        console.log("Extracted words:", words);

        return words;
    } catch (e) {
        console.error("Error fetching words", e);
        return []; 
    }
};

export { fetchWords };