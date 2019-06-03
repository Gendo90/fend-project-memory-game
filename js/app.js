/*
 * Create a list that holds all of your cards
 */
function createDeck() {
     // Initialize the deck
     cardList = new Array();

     // Create and add all <li> "cards" to the deck, 16 in total
     for (let i=0; i<16; i++) {
         let newCard = document.createElement("li");
         newCard.classList.add("card");
         cardList.push(newCard);
     }

     // Create and add <i> elements with icons to the cards
     // For loop runs twice because the cards are doubled up
     let shifter = null;
     let icon = null;

     for (let i=0; i<2; i++) {
         shifter = i*8;

         // Add diamond card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-diamond");
         cardList[0+shifter].appendChild(icon);

         // Add plane card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-paper-plane-o");
         cardList[1+shifter].appendChild(icon);

         // Add anchor card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-anchor");
         cardList[2+shifter].appendChild(icon);

         // Add bolt card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bolt");
         cardList[3+shifter].appendChild(icon);

         // Add cube card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-cube");
         cardList[4+shifter].appendChild(icon);

         // Add leaf card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-leaf");
         cardList[5+shifter].appendChild(icon);

         // Add bicycle card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bicycle");
         cardList[6+shifter].appendChild(icon);

         // Add bomb card icon
         icon = document.createElement("i");
         icon.classList.add("fa", "fa-bomb");
         cardList[7+shifter].appendChild(icon);
     }

     return cardList
 }


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//  set up the event listener for a card. If a card is clicked:
//  (use the ul.deck as the event listener, give the card object to it using
//  the "event" parameter of its listener function)

function getClickedCards() {
    document.getElementById("deck").addEventListener("click", showCard);
}


 //  - display the card's symbol (put this functionality in another function that you call from this one)

function showCard(event) {
    if(event.target.classList.contains("card")) {
        thisCard = event.target
        thisCard.classList.add("show", "open");
        checkCards(thisCard);
    }
}

 //  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
allOpenCards = new Array()
let timerInterval = null;
function checkCards(card) {
    // Prevents the case where a card matches with itself!
    if(card!==allOpenCards[0]) {
        allOpenCards.push(card);
    }

    if(allOpenCards.length===1 && getMoveCount()==0) {
        timerInterval = startTimer();
    }

    if(allOpenCards.length>1) {
        //console.log(allOpenCards[0].firstElementChild.classList.value)
        //console.log(allOpenCards[1].firstElementChild.classList.value)
        if(allOpenCards[0].firstElementChild.classList.value === allOpenCards[1].firstElementChild.classList.value) {

            // run function to lock cards open, matched correctly!
            allOpenCards = setMatchedCards(allOpenCards);
        }
        else {
            // run function to remove cards from "allOpenCards" and
            // function to hide them again (place in above function)
            allOpenCards = revertMismatch(allOpenCards);
        }

        // run function to increment move counter
        let moveCount = incrementMoves()

        // remove star if the moves indicate that the
        // player should have a lower rating
        if(moveCount==21) {
            removeStar();
        }
        else if(moveCount==26) {
            removeStar()
        }
        else if(moveCount==31) {
            removeStar()
        }

        if(isGameOver()) {
            gameOver()
        }

    }

    // run function to check if game is over and if so, display
    // game end message using another function
}

function setMatchedCards(matchedCards) {
    matchedCards.pop().classList.add("match");
    matchedCards.pop().classList.add("match");
    return matchedCards;
}

function revertMismatch(unmatchedCards) {
    // Add a delay to see both cards before flipping them back around
    setTimeout(function() {
        unmatchedCards.pop().classList.remove("show", "open");
        unmatchedCards.pop().classList.remove("show", "open");
    }, 400);

    return unmatchedCards;
}

function getMoveCount() {
    let moveCounter = document.querySelector(".moves");
    let currentMoveCount = Number(moveCounter.textContent);
    return currentMoveCount;
}

function incrementMoves() {
    let currentMoveCount = getMoveCount();
    currentMoveCount++;
    let moveCounter = document.querySelector(".moves");
    moveCounter.textContent = ""+(currentMoveCount);
    return currentMoveCount;
}

function resetMoveCounter() {
    let moveCounter = document.querySelector(".moves");
    moveCounter.textContent = "0"
}

function removeStar() {
    let starList = document.querySelectorAll(".fa-star");
    for (let i=starList.length-1; i>=0; i--) {
        if(!starList[i].classList.contains("defunct")) {
            starList[i].classList.add("defunct");
            break;
        }
    }
}

function getStars() {
    let starList = document.querySelectorAll(".fa-star");
    let starCount = 0;
    for (let i=starList.length-1; i>=0; i--) {
        if(!starList[i].classList.contains("defunct")) {
            starCount++;
        }
    }
    return starCount;
}

function resetStars() {
    let starList = document.querySelectorAll(".fa-star");
    for (let i=starList.length-1; i>=0; i--) {
        if(starList[i].classList.contains("defunct")) {
            starList[i].classList.remove("defunct");
        }
    }
}

function startTimer() {
    let thisInterval = setInterval(incrementTimer, 1000);
    return thisInterval;
}

function getTimerValue() {
    let minutes = document.querySelector("#minutes").textContent;
    let seconds = document.querySelector("#seconds").textContent;
    return [Number(minutes), Number(seconds)]
}

function incrementTimer() {
    [minutes, seconds] = getTimerValue();
    if(seconds<9) {
        seconds++;
        document.querySelector("#seconds").textContent = "0"+seconds;
    }
    else if(seconds<59) {
        seconds++;
        document.querySelector("#seconds").textContent = seconds;
    }
    else if(minutes<9) {
        seconds = "00";
        minutes++;
        document.querySelector("#seconds").textContent = seconds;
        document.querySelector("#minutes").textContent = "0" + minutes;
    }
    else if(minutes<59) {
        seconds = "00";
        minutes++;
        document.querySelector("#seconds").textContent = seconds;
        document.querySelector("#minutes").textContent = minutes;
    }
    else {
        // reset the game if it takes an hour!
        setupReset()
    }
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    stopTimer();
    document.querySelector("#seconds").textContent = "00";
    document.querySelector("#minutes").textContent = "00";
}

function isGameOver() {
    let matchedCards = document.querySelectorAll('.card.match');
    if(matchedCards.length===16) {
        return true;
    }
    else {
        return false;
    }
}

function gameOverMessage() {
    const firstLine = 'You have won the game!<br>';
    let secondLine = '';
    let thirdLine = '';
    let endTime = getTimerValue();
    let starRating = getStars();
    let starHTML = '<i class="fa fa-star"></i>';
    let starText = '';

    if(endTime[0]) {
        secondLine = 'Your time was ' + endTime[0] +
                            ' minutes and ' + endTime[1] +
                            ' seconds!<br>'
    }
    else {
        secondLine = 'Your time was ' + endTime[1] +
                            ' seconds!<br>'
    }

    for(i=0; i<getStars(); i++) {
        starText+=starHTML;
    }
    if(starText) {
        thirdLine = 'Your star rating was ' + starText;
    }
    else {
        thirdLine = 'Sorry, you got no stars. Keep trying!'
    }
    return firstLine+secondLine+thirdLine;
}

function gameOver() {
    stopTimer();
    swal.fire({
        type: 'success',
        title: 'Congratulations!',
        html: gameOverMessage(),
        confirmButtonText: 'Awesome',
        allowOutsideClick: false
    }).then(
            resetGame
  )
}
 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Overall function to run the game!
function runGame() {
     // Make the deck to be used
     let actualDeck = createDeck();

     // Shuffle the deck
     actualDeck = shuffle(actualDeck);

     // Place all cards onto the page, into the right <ul> element
     let webpageDeck = document.getElementById("deck");
     for (let i = 0; i<actualDeck.length; i++) {
         webpageDeck.appendChild(actualDeck[i]);
     }

     // run the function below when app is ready!
     getClickedCards()
}

function resetGame() {
    let deckContainer = document.getElementById("deck");
    while(deckContainer.firstChild) {
        deckContainer.removeChild(deckContainer.firstChild);
    }
    resetMoveCounter();
    resetStars();
    resetTimer();
    runGame();
}

function setupReset() {
    document.getElementById("restart").addEventListener("click", function() {
        resetGame();
    });
}


function gameInfo() {
    const gameInfoHTML = `Hello! The object of this game
                          is to match each pair of cards.
                          You can click a card to view it, and then
                          click another card to view it as well, and
                          the cards will remain visible if they are a
                          match. The cards will quickly become hidden again
                          if they are not a match. The game is over when
                          all cards have been matched. Have fun!`
    return gameInfoHTML;
}

// run an alert window explaining the game when the window loads
function explainGame() {
    swal.fire({
        type: 'info',
        title: 'Matching Game',
        html: gameInfo(),
        confirmButtonText: 'Sounds good!',
        allowOutsideClick: false
    })
}

// function to explain and start the initial game
function setupGame() {
    explainGame()
    setupReset()
    runGame()
}

// explain and start the initial game when content is loaded
window.addEventListener('DOMContentLoaded', setupGame());
