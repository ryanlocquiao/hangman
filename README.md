# Vanilla JS Hangman

A classic Hangman game built entireely in the browser using HTML5, CSS3, and vanilla JavaScript.

## Learning Goals Achieved
* **Client-Side Application**: Runs 100% in the browser with no backend dependencies.
* **Vanilla JavaScript**: Uses no third-party libraries (no jQuery, no React).
* **Event Listeners**: Dynamically generates a virtual keyboard and listens for user clicks to process guesses.
* **DOM Manipulation**: Dynamically updates the UI based on game state (revealing letters, disabling buttons, changing text).
* **Web Storage API**: Utilizes `localStorage` to save the game state (`word`, `guessedLetters`, `mistakes`, `status`) on every turn. If the user closes the browser and returns, their game resumes exactly where they left off.
* **Canvas API**: Draws the hangman scaffolding and character progressively using the HTML5 `<canvas>` element.

## How to Play
1. The game selects a random word.
2. Click the letters on the virtual keyboard to make a guess.
3. If the letter is in the word, it will reveal itself.
4. If the letter is incorrect, a part of the hangman will be drawn.
5. You win if you guess the word before 6 mistakes. You lose if the hangman is completely drawn.
6. Click "New Game" to start over.