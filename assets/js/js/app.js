/**
   * Array with image source links to be retrieved and inserted into the HTML when cards are created
   */

const myCards = [
   "img1px.jpg",
   "img2px.jpg",
   "img3px.jpg",
   "img4px.jpg",
   "img5px.jpg",
   "img6px.jpg",
   "img7px.jpg",
   "img8px.jpg",
];



//  let count = 0;
//  let correct_flips = 0;
//  let last_flipped = [];

let cardsId = [];
let cardsSelected = [];
let moves = 0;
let seconds = 0;
let minutes = 0;


let flipCounter = 0;
let turnsCounter = 0;
let countSelected = 0;

let checkCard = null;
let matchedCards = [];
let busy = false;
let fullDeck = [];

const delayBeforeRemovingCards = 100;

// Main menu section
const mainMenuSection = document.getElementById("main-menu-section");
// const cardsList = [];

// Game display section
const displayGame = document.getElementById("display-game");
//  const cardP = document.getElementById("my-pexeso");
const levelGame = document.querySelector("#chooseLevel span:nth-child(2)");
const time = document.getElementById("time");
const counter = document.getElementById("counter");
const back = document.getElementById("goBack");


const btnColor = document.querySelector('#buttonColor');

// Game my level modal for easy and hard

const easyButton = document.getElementById("easy");
easyButton.addEventListener("click", function () {
   chooseLevel("easy");
});

const hardButton = document.getElementById("hard");
hardButton.addEventListener("click", function () {
   chooseLevel("hard");
});

function random(number) {
   return Math.floor(Math.random() * (number + 1));
}

btnColor.onclick = function () {
   const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
   document.body.style.backgroundColor = rndCol;
}


// ----------------------- Buttons
// Back to main menu buttons
back.addEventListener("click", function () {
   startPexesoGame();
});

// ----------------------- Game start



function startPexesoGame() {
   mainMenuSection.style.display = "flex";
   displayGame.style.display = "none";
}



// Create cards in game pexeso according to the selected level
// Hide main menu section and show game arena section
// Set and display points, level, timer, turn counter in their starting values
// Call functions to shuffle cards, start timer and active score system

let selectLevel;
let pairs;

function chooseLevel(playerLevel) {
   let cardNum = 15;

   if (playerLevel === "easy") {
      selectLevel = "easy";
      cardNum = 8;
      levelGame.innerHTML = selectLevel;
      pairs = 4;
   } else if (playerLevel === "hard") {
      selectLevel = "hard";
      cardNum = 16;
      levelGame.innerHTML = selectLevel;
      pairs = 8;
   }

   mainMenuSection.style.display = "none";
   // displayGame.style.display = "flex";

   // We divide the number of card by two in order to create pairs
   randomCards = shuffleImages(cardNum / 2);
   appendCards(randomCards);

   //attachCardEventListeners();
}

function appendCards(randomCards) {
   const cards = randomCards.concat(randomCards)

   //  const cards = myCard.concat(myCard);
   const cardsContainer = document.getElementById("grid-container");    //change from cards-container

   cards.forEach((imageName) => cardsContainer.insertAdjacentHTML("beforeend", renderCard(imageName)));
   let elements = Array.from(document.getElementsByClassName("card"));

   elements.forEach((card) => {                                         
      card.addEventListener("click", () => {
         flippingCard(card);
      });
   });

   fullDeck = elements;
}

function flippingCard(card) {
   if (isCardFlipped(card)) {
      turnsCounter++;
      card.classList.add('visible');
      if (checkCard) {
         checkForMatch(checkCard, card);
         checkCard = null;
      } else {
         checkCard = card;
      }
   }
   console.log("Card flipped!");
}

function isCardFlipped(card) {
   console.log('Check if card is flipped!');
   return (
      !busy && !matchedCards.includes(card) && card !== checkCard
  );
}


// To remove cards while doubled when starting level

function clearCards() {
   let cardsAppend = Array.from(document.getElementsByClassName("card"));
   cardsAppend.forEach((card) => card.remove());
}


// Render Cards on Pexeso Board

/**
 * Renders the card element using the image name passed as a parameter
 * @param {String} pexesoImg
 */
function renderCard(pexesoImg) {                          //myCard?      // id="grid-container" ?
   return `<div class="card">
               <div class="card-back all-cards">
                     <img class="card-img" src="assets/images/pexesoCard.jpg"  alt="Hidden card">
               </div> 
               <div class="card-picture all-cards">
                     <img class="card-value card-img" src="assets/images/${pexesoImg}" alt="Picture card">
               </div>
          </div>`;
}


// function attachCardEventListeners() {

//    // Images are the ones that need to change visibility
//    const images = document.querySelectorAll('.card-picture');

//    // Card need to be clicked
//    const cards = document.querySelectorAll('.card');

//    images.forEach(cardImage => cardImage.classList.add('flip')); //("flip-card")
//    cards.forEach(card => card.addEventListener('click', function (event) {

//       showCard(this);

//       console.log('card clicked was: ', event.target)  //event.target.id
//    }))
// }

function showCard(event, card) {
   // This can be done with toggle of the class as per another answer
   card.classList.toggle("flip"); //("flip-card")
   // this.classList.remove('flip');
   card.style.visibility = 'visible';

   event.target.classList.add("flip");  //("flip-card")
}

// Check cards if they match

function checkForMatch(card1, card2) {
   console.log('Check for a match');
   if (checkCardType(card1) === checkCardType(card2)) {
      cardMatcher(card1, card2);
   } else {
      notAMatch(card1, card2);
   }
}

function cardMatcher(card1, card2) {
   // Adds the cards to the matchedCards array to track progress
   matchedCards.push(card1);
   matchedCards.push(card2);
   setTimeout(() => {
       card1.classList.add("invisible");
       card2.classList.add("invisible");
   }, delayBeforeRemovingCards);
   //checkCard = null;
   // Ends the game when all cards have been matched
   if (matchedCards.length === fullDeck.length) {
       gameWin();
   }
}

function notAMatch(card1, card2) {
   busy = true;
   setTimeout(() => {
       card1.classList.remove("visible");
       card2.classList.remove("visible");
       busy = false;
   }, 500);
}


function checkCardType(card) {
   return card.getElementsByClassName("card-value")[0].src;
}


function gameWin() {
   console.log('Game Win!');
}


// Check if two cards are a match-> comparing two values in array
const checkMatch = (myCard) => {
   if (myCard[0] === myCard[1]) {
      console.log("it's a match");
      return true;
   }
};


function shuffleImages(cardNum) {
   const shuffImg = myCards.slice(0, cardNum);
   for (let i = cardNum-1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = shuffImg[i];
      shuffImg[i] = shuffImg[j];
      shuffImg[j] = temp;
   }
   return shuffImg;
}
