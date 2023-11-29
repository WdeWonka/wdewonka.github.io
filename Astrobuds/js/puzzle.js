//--------If not register, go back to index -------------
document.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.replace("index.html");
  }
});

//-------------- BACKCGROUND ANIMATION -----------------
const bgAnimation = document.getElementById("bg-animation");

const numberOfColorBox = 400;

for (let i = 0; i < numberOfColorBox; i++) {
  const colorumBox = document.createElement("div");

  colorumBox.classList.add("bx-color");
  bgAnimation.append(colorumBox);
}

//--------------- GUESS GAME ---------------------------

const questions = [
  {
    image: "assets/images/puzzle/sol.png",
    correct_option: "Sol",
  },
  {
    image: "assets/images/puzzle/mars.png",
    correct_option: "Marte",
  },
  {
    image: "assets/images/puzzle/telescopio.png",
    correct_option: "Telescopio",
  },
  {
    image: "assets/images/puzzle/saturno.png",
    correct_option: "Saturno",
  },
  {
    image: "assets/images/puzzle/luna.png",
    correct_option: "Luna",
  },
  {
    image: "assets/images/puzzle/jupiter.png",
    correct_option: "Jupiter",
  },
  {
    image: "assets/images/puzzle/cohete.png",
    correct_option: "Cohete",
  },
  {
    image: "assets/images/puzzle/ovni.png",
    correct_option: "Ovni",
  },
  {
    image: "assets/images/puzzle/nebulosa.png",
    correct_option: "Nebulosa",
  },
  {
    image: "assets/images/puzzle/tierra.png",
    correct_option: "Tierra",
  },
  {
    image: "assets/images/puzzle/meteoro.png",
    correct_option: "Meteoro",
  },
  {
    image: "assets/images/puzzle/agujeroNegro.png",
    correct_option: "Agujero Negro",
  },
  {
    image: "assets/images/puzzle/alien.png",
    correct_option: "Alien",
  },
  {
    image: "assets/images/puzzle/astronauta.png",
    correct_option: "Astronauta",
  },
  {
    image: "assets/images/puzzle/satelite.png",
    correct_option: "Satelite",
  },
];

const optionsArray = [
  "Sol",
  "Luna",
  "Tierra",
  "Marte",
  "Venus",
  "Júpiter",
  "Saturno",
  "Urano",
  "Neptuno",
  "Cometa",
  "Asteroide",
  "Meteorito",
  "Galaxia",
  "Nebulosa",
  "Estrella",
  "Agujero Negro",
  "Cúmulo Estelar",
  "Planeta",
  "Órbita",
  "Eclipse",
  "Sistema Solar",
  "Constelación",
  "Nave Espacial",
  "Exploración",
  "Astronauta",
  "Telescopio",
  "Cosmos",
  "Supernova",
  "Exoplaneta",
  "Aurora",
  "Gravedad",
  "Astronomía",
  "Via Láctea",
  "Cohete",
  "Estación Espacial",
  "Vía Láctea",
  "Planeta Enano",
  "Atmósfera",
];

const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown,
  count = 11;

const randomValueGenerator = (array) =>
  array[Math.floor(Math.random() * array.length)];
const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

//Start game
const startGame = () => {
  //Select random 5 questions
  scoreContainer.classList.add("hide");
  gameContainer.classList.remove("hide");
  finalQuestions = populateQuestions();
  score = 0;
  currentQuestion = 0;
  //Generate card for first question
  cardGenerator(finalQuestions[currentQuestion]);
};
//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count -= 1;
    timer.innerHTML = `<span>Tiempo: </span>${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      nextQuestion();
    }
  }, 1000);
};
//Create options
const populateOptions = (correct_option) => {
  let arr = [];
  arr.push(correct_option);
  let optionsCount = 1;
  while (optionsCount < 4) {
    let randomvalue = randomValueGenerator(optionsArray);
    if (!arr.includes(randomvalue)) {
      arr.push(randomvalue);
      optionsCount += 1;
    }
  }
  return arr;
};
//Choose random questions
const populateQuestions = () => {
  let questionsCount = 0;
  let chosenObjects = [];
  let questionsBatch = [];
  //5 Questions
  while (questionsCount < 5) {
    let randomvalue = randomValueGenerator(questions);
    let index = questions.indexOf(randomvalue);
    if (!chosenObjects.includes(index)) {
      questionsBatch.push(randomvalue);
      chosenObjects.push(index);
      questionsCount += 1;
    }
  }
  return questionsBatch;
};
//check selected answer
const checker = (e) => {
  let userSolution = e.target.innerText;
  let options = document.querySelectorAll(".option");
  if (userSolution === finalQuestions[currentQuestion].correct_option) {
    e.target.classList.add("correct");
    score++;
  } else {
    e.target.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == finalQuestions[currentQuestion].correct_option) {
        element.classList.add("correct");
      }
    });
  }
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
};
//Next question
const nextQuestion = (e) => {
  //increment currentQuestion
  currentQuestion += 1;
  if (currentQuestion == finalQuestions.length) {
    gameContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    startButton.innerText = `Reiniciar`;
    userScore.innerHTML =
      " Lograste acertar " + score + " de " + currentQuestion;
    clearInterval(countdown);
  } else {
    cardGenerator(finalQuestions[currentQuestion]);
  }
};
//Card Ui
const cardGenerator = (cardObject) => {
  const { image, correct_option } = cardObject;
  let options = randomShuffle(populateOptions(correct_option));
  container.innerHTML = `<div class="quiz">
  <p class="num">
  ${currentQuestion + 1}/5
  </p>
  <div class="questions">
    <img class="space-image" src="${image}"/>
  </div>
    <div class="options">
    <button class="option" onclick="checker(event)">${options[0]}
    </button>
    <button class="option" onclick="checker(event)">${options[1]}
    </button>
    <button class="option" onclick="checker(event)">${options[2]}
    </button>
    <button class="option" onclick="checker(event)">${options[3]}
    </button>
    </div>
    <div class="nxt-btn-div">
        <button class="next-btn" onclick="nextQuestion(event)">Siguiente</button>
    </div>
  </div>`;
  //For timer
  count = 11;
  clearInterval(countdown);
  //Display timer
  timerDisplay();
};
startButton.addEventListener("click", startGame);
