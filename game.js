document.addEventListener('DOMContentLoaded', function() {

const gameContainer = document.getElementById("game");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let noClick = false;

// array of colors that will be used in the Memory Game
const COLORS = [
    'red',
    'blue',
    'green',
    'orange',
    'purple',
    'red',
    'blue',
    'green',
    'orange',
    'purple'
];

// this function will create the shuffle needed for the game.
// randomizing index and decreases the counter by one
function shuffle(array) {
    let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
    }
    return array;
};


let colorShuffle = shuffle(COLORS);

// creates a loop for the array of colors and its multiple divs

function divsCreatedForColors(colorArray) {
        for (let color of colorArray) {
            const newDiv = document.createElement('div');
            newDiv.classList.add(color);
            newDiv.addEventListener('click', cardClick);
            gameContainer.append(newDiv);
    }
};

// the function below creates the clicking function for the game
// includes the flipping of the cards, matching, and restarting
function cardClick(event) {
        if (noClick) return;
        if(event.target.classList.contains('flipped')) return;

            let currentCard = event.target;
            currentCard.style.backgroundColor = currentCard.classList[0];

            // if the first card or second card are NOT the same
        if (!firstCard || !secondCard) {
            currentCard.classList.add('flipped');
            firstCard = firstCard || currentCard;
            // ternary operator for second and current card
            secondCard = currentCard === firstCard ? null : currentCard;
        };

        if (firstCard && secondCard) {
        noClick = true;
            let firstColor = firstCard.className;
            let secondColor = secondCard.className;

        if (firstColor === secondColor) {
            flippedCards += 2;
                firstCard.removeEventListener('click', cardClick);
                secondCard.removeEventListener('click', cardClick);

                firstCard = null;
                secondCard = null;

                noClick = false;

        } else {
            setTimeout(function() {
                firstCard.style.backgroundColor = '';
                secondCard.style.backgroundColor = '';

                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');

                firstCard = null;
                secondCard = null;

            noClick = false;
            }, 500);
        }
    }
    if (flippedCards === COLORS.length) alert('CONGRATS! GAME OVER!')
};

divsCreatedForColors(colorShuffle);

});

