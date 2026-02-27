// Pictionary Game Logic

class PictionaryGame {
    constructor(participants) {
        this.participants = participants;
        this.currentWord = '';
        this.currentDrawer = '';
        this.guesses = {};
        this.roundTime = 60; // seconds
    }

    startGame() {
        console.log('Game has started!');
        this.nextRound();
    }

    nextRound() {
        this.currentDrawer = this.getRandomDrawer();
        this.currentWord = this.getRandomWord();
        this.guesses = {};
        console.log(`Round started! ${this.currentDrawer} is drawing...`);
        this.startTimer();
    }

    getRandomDrawer() {
        return this.participants[Math.floor(Math.random() * this.participants.length)];
    }

    getRandomWord() {
        const words = ['apple', 'giraffe', 'computer', 'house', 'car'];  // Add more words here
        return words[Math.floor(Math.random() * words.length)];
    }

    startTimer() {
        let timeLeft = this.roundTime;
        const timer = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timer);
                console.log(`Time's up! The word was: ${this.currentWord}`);
                this.nextRound();
            } else {
                console.log(`Time left: ${timeLeft} seconds`);
                timeLeft--;
            }
        }, 1000);
    }

    submitGuess(participant, guess) {
        if (this.guesses[participant]) {
            console.log(`${participant}, you already guessed: ${this.guesses[participant]}`);
            return;
        }
        this.guesses[participant] = guess;
        if (guess.toLowerCase() === this.currentWord.toLowerCase()) {
            console.log(`Congratulations ${participant}, you guessed the word!`);
            this.nextRound();
        } else {
            console.log(`${participant}, your guess was incorrect.`);
        }
    }
}

// Example usage:
const game = new PictionaryGame(['Alice', 'Bob', 'Charlie']);
game.startGame();