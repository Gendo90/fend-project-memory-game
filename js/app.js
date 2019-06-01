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

// Make the deck to be used
let actualDeck = createDeck();

// Shuffle the deck
actualDeck = shuffle(actualDeck);

// Place all cards onto the page, into the right <ul> element
let webpageDeck = document.getElementById("deck");
for (let i = 0; i<actualDeck.length; i++) {
    webpageDeck.appendChild(actualDeck[i]);
}


//  set up the event listener for a card. If a card is clicked:
//  (use the ul.deck as the event listener, give the card object to it using
//  the "event" parameter of its listener function)

function getClickedCards() {
    document.getElementById("deck").addEventListener("click", showCard);
}


 //  - display the card's symbol (put this functionality in another function that you call from this one)

function showCard(event) {
    thisCard = event.target
    thisCard.classList.add("show", "open");
    checkCards(thisCard);
}

 //  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
allOpenCards = new Array()
function checkCards(card) {
    // Prevents the case where a card matches with itself!
    if(card!==allOpenCards[0]) {
        allOpenCards.push(card);
    }

    if(allOpenCards.length>1) {
        console.log(allOpenCards[0].firstElementChild.classList.value)
        console.log(allOpenCards[1].firstElementChild.classList.value)
        if(allOpenCards[0].firstElementChild.classList.value === allOpenCards[1].firstElementChild.classList.value) {
            console.log(allOpenCards)
            // run function to lock cards open, matched correctly!
            allOpenCards = setMatchedCards(allOpenCards);
        }
        else {
            // run function to remove cards from "allOpenCards" and
            // function to hide them again (place in above function)
            allOpenCards = revertMismatch(allOpenCards);
        }
    }
    // run function to increment move counter

    // run function to check if game is over and if so, display
    // game end message using another function
}

function setMatchedCards(matchedCards) {
    matchedCards.pop().classList.add("match");
    matchedCards.pop().classList.add("match");
    return matchedCards;
}

function revertMismatch(unmatchedCards) {
    unmatchedCards.pop().classList.remove("show", "open");
    unmatchedCards.pop().classList.remove("show", "open");
    return unmatchedCards;
}

 /*  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


 // run the function below when app is ready!
 getClickedCards()
