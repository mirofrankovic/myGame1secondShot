/**
   * Array with image source links to be retrieved and inserted into the HTML when cards are created
   */

 const myCard = [
    "img1px.jpg",
    "img2px.jpg",
    "img3px.jpg",
    "img4px.jpg",
    "img5px.jpg",
    "img6px.jpg",
    "img7px.jpg",
    "img8px.jpg",
 ];
 
 
 
 let count = 0;
 let correct_flips = 0;
 let last_flipped = [];
 let moves = 0;
 let seconds = 0;
 let minutes = 0;
   
 
 // Main menu section
 const mainMenuSection = document.getElementById("main-menu-section");
 // const cardsList = [];
 
 // Game display section
 const displayGame = document.getElementById("display-game");
 const cardP = document.getElementById("my-pexeso");
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
 
 
 
 // Highscores modal
 
 // Game win modal
 
 
 // Times up modal
 
 // Clear confirmation modal
 
 
 // ----------------------- Buttons
 // Back to main menu buttons
 back.addEventListener("click", function () {
    startPexesoGame();
 });
 
 // ----------------------- Game start
 
 
 
 function startPexesoGame() {
    mainMenuSection.style.display = "flex";
    displayGame.style.display = "none";
 
 
    // appendCards();
 }
 
 
 
 // Create cards in game pexeso according to the selected level
 // Hide main menu section and show game arena section
 // Set and display points, level, timer, turn counter in their starting values
 // Call functions to shuffle cards, start timer and active score system
 
 let selectLevel;
 let pairs;
 
 function chooseLevel(playerLevel) {
    let cards = "";
    let cardNum = 15;
 
    if (playerLevel === "easy") {
       selectLevel = "easy";
       cardNum = 7;
       levelGame.innerHTML = selectLevel;
       pairs = 4;
    } else if (playerLevel === "hard") {
       selectLevel = "hard";
       cardNum = 15;
       levelGame.innerHTML = selectLevel;
       pairs = 8;
 
    }
 
    shuffleImages();
 
    let i;
    for (i = 0; i <= cardNum; i++) {
       cards = `${cards}<div class="card" id="c${i}"></div>`;
    }
 
    // cardP.innerHTML = cards;
 
    mainMenuSection.style.display = "none";
    displayGame.style.display = "flex";
 
    appendCards(cardNum);         // add variable
    attachCardEventListeners();
 
 }
 
 //add parameter cardNum to appendCards to determine how many cards I need to append  => for loop?
 //https://stackoverflow.com/questions/52739898/making-cards-with-javascript-and-html   for loop
 //https://stackoverflow.com/questions/55426589/how-to-append-an-array-of-objects-to-a-card-element-in-javascript append cards
 
 function appendCards(cardNum){


   if (selectLevel === "easy") {
      var cards = myCard;
  } else if (selectLevel === "hard") {
      var cards = myCard.concat(myCard);
  }
 
   //  const cards = myCard.concat(myCard);
    const cardsContainer = document.getElementById("cards-container");

    
    const frontFaces = document.getElementsByClassName('card-img');
    const backFaces = document.getElementsByClassName('card-picture');


       
      // for (let i = 1; i <= cardNum; i++) {
      //    let myDiv = document.createElement("div");
      //    // cards = `${cards}<div class="card" id="c${i}"></div>`;
      // if (i%2 === 0) {
      //    myDiv.innerHTML = "<div class=\"card\">"+ i +"</div>" 
      // }
      // else {
      //    myDiv.innerHTML = "<div class=\"card card-odd\">"+ i +"</div>" 
      // }
      //    cardsContainer.appendChild(myDiv);
      // }
      
 
    if(cardNum === 8){
      levelGame.innerHTML = selectLevel;
       
    }else if (cardNum === 16){
      levelGame.innerHTML = selectLevel;
    }
    console.log(cardNum)


    cards.forEach((imageName) => {                                         //conatain the value from array
       cardsContainer.insertAdjacentHTML("beforeend", renderCards(imageName)) //what add parameter->passing arguments imageName
 
       let cardsAppend = Array.from(document.getElementsByClassName("card"));
 
       cardsAppend.forEach((card) => {
          card.addEventListener("click", () => {
              this.turnCard(card);
          });
         //  console.log("APPENDING CARDS")
       }
       
       )});

       
    }
 
 // To remove cards while doubled when starting level
 
 function clearCards() {
    let cardsAppend = Array.from(document.getElementsByClassName("card"));
    cardsAppend.forEach((card) => card.remove());
 }
 
 
 // Render Cards on Pexeso Board
 
 /**
     * Renders the card element using the image name passed as a parameter
     * @param {String} pexesoImg     //pexesoImg
     */
 
  function renderCards(pexesoImg) {                          //myCard?
    return `<div class="card">
                     <div class="card-back all-cards">
                         <img class="card-img" src="../../images/pexesoCard.jpg"  alt="Hidden card">
                     </div> 
                     <div class="card-picture all-cards">
                         <img class="card-value card-img" src="assets/images/${pexesoImg}" alt="Picture card">
                     </div>
                 </div>`;
 
 }
 
 
 function attachCardEventListeners() {
    const cards = document.querySelectorAll('.card');       //parameter
    cards.forEach(card => card.addEventListener('click', (event) => {   //event display card
 
       console.log('card clicked was: ', event.target.id)
    }))
 }
 
 
 function turnCard(){
 
 }
 
 
 // Shuffle cards before each game
 let shuffImg;
 
 function shuffleImages() {
    shuffImg = myCard.slice();
    let cardNum = 12;
    if (selectLevel === "easy") {
       cardNum = 6;
    } else if (selectLevel === "hard") {
       cardNum = 10;
    }
 
    let i;
    let j;
    let temp;
    for (i = cardNum; i > 0; i--) {
       j = Math.floor(Math.random() * (i + 1));
       temp = shuffImg[i];
       shuffImg[i] = shuffImg[j];
       shuffImg[j] = temp;
    }
    return shuffImg;
 
 }
 
 const addCard = document.getElementById("cards-container");  //DOM
 addCard.addEventListener("click", function () {
 
 });
 
 const cards = myCard
    .concat(myCard);  //concatenating the cards as an array
 cards.sort(() => 0.5 - Math.random());
 
 
 //Flipping my cards
 
 
 function flippingCards() {
 
    console.log('I was clicked');
    console.log(this);
 }
 
 // Check if two cards are a match-> comparing two values in array
 const checkMatch = (myCard) => {
    if (myCard[0] === myCard[1]) {
       console.log("it's a match");
       return true;
    }
 };
 
 
 
 // Add figure on the other side of card
 // Check if one or two cards reversed
 // Check if two cards are the same
 // Add lock to prevent reverse more than 2 cards before check
 // Update turn counter with every two cards reversed
 // Call scoring function to add points when 2 cards match and subtract points when don't
 
 
 
 
 // When 2 reversed cards match keep them on board
 // Remove lock
 // Update pairs variable and if 0 clear time interval
 // Play finish audio when all pairs reversed
 
 
 
 
 
 // When 2 reversed cards do not match restore them
 // Remove lock
 
 
 
 
 // Game timer
 // Set interval
 // Clear interval when times up or quit button hit
 // Show times up modal when time = 0
 
 
 
 
 // Score system
 // Show game win modal when all pairs match
 
 
 
 // Play again when times up
 
 
 
 // Save score to local storage
 // Show score in highscores modal
 
 
 
 // console.log("hallo there is miro");