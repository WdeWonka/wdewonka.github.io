//-------------- BACKCGROUND ANIMATION -----------------
const bgAnimation = document.getElementById("bg-animation");

const numberOfColorBox = 400;

for (let i = 0; i < numberOfColorBox; i++) {
  const colorumBox = document.createElement("div");

  colorumBox.classList.add("bx-color");
  bgAnimation.append(colorumBox);
}

//-------------- SCRAMBLE GAME-----------------

const wordTxt = document.querySelector(".word");
const hintTxt = document.querySelector(".hint span");
const timeTXT = document.querySelector(".time b");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);

  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeTXT.innerText = maxTime);
    }
    clearInterval(timer);
    Swal.fire({
      title: "¡Tiempo agotado!",
      text: `La palabra correcta era: ${correctWord.toUpperCase()}`,
      icon: "info",
      iconColor: "#ccc",
      confirmButtonColor: "#ccc",
    });
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(31);
  let randomItem = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomItem.word.split("");

  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    //shuffle
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordTxt.innerText = wordArray.join(""); //convierte el texto de ('a', 'b',) a (a b)
  hintTxt.innerText = randomItem.hint;
  correctWord = randomItem.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();

  if (!userWord)
    return Swal.fire({
      icon: "warning",
      title: "Campo Vacío",
      text: "Por favor, ingrese una palabra antes de verificar.",
      confirmButtonColor: "#ffc107",
    });

  if (userWord !== correctWord)
    return Swal.fire({
      icon: "error",
      iconColor: "#dc3545",
      title: "Oops!",
      text: `"${userWord}" no es la palabra correcta.`,
      confirmButtonColor: "#dc3545",
    });

  Swal.fire({
    title: "¡Acertaste!",
    text: `"${userWord.toUpperCase()}" es la palabra correcta.`,
    icon: "success",
    confirmButtonColor: "#28a745",
  });
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

//FUNCTIONALITY WITH ENTER KEY
document.addEventListener("DOMContentLoaded", () => {
  inputField.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      checkWord();
    }
  });
});

//---- IF not register , moves back to the index------------
document.addEventListener("DOMContentLoaded", function () {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn || isLoggedIn !== "true") {
    window.location.replace("index.html");
  }
});
