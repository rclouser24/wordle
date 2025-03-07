const {Wordle, GREEN, YELLOW, BLACK} = require("../classes/Wordle.js")

describe("Wordle", () => {
    it('if guess has different number of letters than wordle, return empty array', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("boom")
        expect(result).toEqual([])
    })

    it('if guess matches word, return array of all green', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("alert")
        expect(result).toEqual([GREEN, GREEN, GREEN, GREEN, GREEN])
    })

    it('if the first letter is in correct position, return green for the position', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("abbbb")
        expect(result).toEqual([GREEN, BLACK, BLACK, BLACK, BLACK])
    })

    it('if the last letter is in correct position, return green for the position', () => {
        const wordle = new Wordle ("alerts")
        const result = wordle.checkWord("bbbbbs")
        expect(result).toEqual([BLACK, BLACK, BLACK, BLACK, BLACK, GREEN])
    })

    it('if letter exists but in wrong position', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("bbabb")
        expect(result).toEqual([BLACK, BLACK, YELLOW, BLACK, BLACK])
    })

    it('if no letters are part of the wordle', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("bbbbb")
        expect(result).toEqual([BLACK, BLACK, BLACK, BLACK, BLACK])
    })

    it('if letter exists multiple times in the guess, but only one time in the wordle', () => {
        const wordle = new Wordle ("alert")
        const result = wordle.checkWord("abbab")
        expect(result).toEqual([GREEN, BLACK, BLACK, BLACK, BLACK])
    })

    describe ('repeatedLetterInWordle', () => {
        it('guess word has no repeated letters', () => {
            const wordle = new Wordle ('alert');
            const result = wordle.repeatedLetterGuess('abcde', 0);
            expect(result).toEqual(false)
        })

        it('guess word has repeated letters but only one exists in wordle', () => {
            const wordle = new Wordle ('alert');
            const result = wordle.repeatedLetterInGuess('abate', 2);
            expect(result).toEqual(true)
        })

    })
})