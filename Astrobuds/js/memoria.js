//-------------- BACKCGROUND ANIMATION -----------------
const bgAnimation = document.getElementById("bg-animation");

const numberOfColorBox = 400;

for (let i = 0; i < numberOfColorBox; i++) {
  const colorumBox = document.createElement("div");

  colorumBox.classList.add("bx-color");
  bgAnimation.append(colorumBox);
}

//---- IF not register , moves back to the index------------
document.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.replace("index.html");
  }
});

//-------------- MEMORY GAME---------------------------

const moves = document.getElementById("move-counter");
const timeValue = document.getElementById("time");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const gameBox = document.querySelector(".game-box");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards, interval;
let firstCard = false,
  secondCard = false;

//iTEMS
const items = [
  { name: "alien", img: "assets/images/memory-cards/alien.png" },
  { name: "asteroid", img: "assets/images/memory-cards/asteroid.png" },
  { name: "astronaut", img: "assets/images/memory-cards/astronaut.png" },
  { name: "earth", img: "assets/images/memory-cards/earth.png" },
  { name: "mars", img: "assets/images/memory-cards/mars.png" },
  { name: "saturn", img: "assets/images/memory-cards/saturn.png" },
  { name: "rocket", img: "assets/images/memory-cards/rocket.png" },
  { name: "sun", img: "assets/images/memory-cards/sun.png" },
  { name: "moon", img: "assets/images/memory-cards/moon.png" },
  { name: "neptune", img: "assets/images/memory-cards/neptune.png" },
];

//TiME
let seconds = 0,
  minutes = 0;

//MOVES & MOVE WHEN WiNNiNG
let movesCount = 0,
  winCount = 0;

//TiMER

const timer = () => {
  seconds += 1;

  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //TiME FORMAT
  let sValues = seconds < 10 ? `0${seconds}` : seconds;
  let mValues = minutes < 10 ? `0${minutes}` : minutes;

  timeValue.innerHTML = `<span>Tiempo: </span>${mValues}:${sValues}`;
};

//MOVE  CALCULATiON
const moveCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Movimientos: </span>${movesCount}`;
};

//CHOOSE RANDOM iTEMS FROM THE LiST
const itemRandomizer = (size = 4) => {
  let tempList = [...items];
  let cardValues = [];

  //MATRIX FORMULA:  4*4 / 2  (4*4 = matriz) ,
  //se divide por dos porque cada carta tiene su pareja)

  size = (size * size) / 2;
  //RANDOM
  for (let i = 0; i < size; i++) {
    const rIndex = Math.floor(Math.random() * tempList.length);
    cardValues.push(tempList[rIndex]);
    //REMOVE THE SELECTED iTEM FORM THE TEMP LiST
    tempList.splice(rIndex, 1);
  }
  return cardValues;
};

const matrixCreator = (cardValues, size = 4) => {
  gameBox.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  //SHUFFLE
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    //before = parte de atras de la carta
    //after = parte frontal de la carta

    gameBox.innerHTML += `
    <div class="card-container" data-card-value="${cardValues[i].name}">
    
      <div class="card-before">
        <img src="assets/images/memory-cards/back.png" class="image" />
      </div>
     <div class="card-after">
        <img src="${cardValues[i].img}" class="image" />
      </div>
    </div>
    `;
  }

  //GRiD
  gameBox.style.gridTemplateColumns = `repeat(${size}, auto)`;

  //CARDS
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (
        !card.classList.contains("matched") &&
        !card.classList.contains("is-flipped")
      ) {
        //flip card
        card.classList.add("is-flipped");

        if (!firstCard) {
          firstCard = card;

          firstCardValue = card.getAttribute("data-card-value");
        } else {
          moveCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          console.log(firstCardValue);
          console.log(secondCardValue);
          if (firstCardValue === secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            firstCard = false;

            winCount += 1;

            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>¡Misión Cumplida, Explorador!</h2>
              <h4>Movimientos: ${movesCount}</h4>`;

              stopGame();
              document.getElementById("start").innerText = "JUGAR DE NUEVO";
            }
          } else {
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("is-flipped");
              tempSecond.classList.remove("is-flipped");
            }, 700);
          }
        }
      }
    });
  });
};

const gWrapper = document.querySelector(".game-wrapper");

//START GAME
startBtn.addEventListener("click", () => {
  movesCount = 0;
  gWrapper.style.display = "block";
  controls.classList.add("hide");
  stopBtn.classList.remove("hide");
  startBtn.classList.add("hide");

  interval = setInterval(timer, 1000);
  moves.innerHTML = `<span>Movimientos: </span> ${movesCount}`;
  iniciar();
});

stopBtn.addEventListener(
  "click",
  (stopGame = () => {
    gWrapper.style.display = "none";
    controls.classList.remove("hide");
    stopBtn.classList.add("hide");
    startBtn.classList.remove("hide");
    clearInterval(interval);

    document.getElementById("start").innerText = "CONTINUAR";
  })
);

let gameStarted = false;

const iniciar = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = itemRandomizer();
  // console.log(cardValues);
  matrixCreator(cardValues);
};
