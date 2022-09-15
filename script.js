const display = document.getElementById("display");
const question = document.getElementById("question");
const startBtn = document.getElementById("starts");
const countdownOverlay = document.getElementById("countdown");
const resultModal = document.getElementById("result");
const modalBackground = document.getElementById("modal-background");

// variables
let userText = "";
let errorCount = 0;
let startTime;
let questionText = "";
let startType;
let endType;
let wordInMin;
let a = 0;

// Load and display question
fetch("./texts.json")
  .then((res) => res.json())
  .then((data) => {
    questionText = data[Math.floor(Math.random() * data.length)];
    question.innerHTML = questionText;
  });

// checks the user typed character and displays accordingly

const typeController = (e) => {
  const newLetter = e.key;
  // Handle backspace press
  if (newLetter == "Backspace") {
    userText = userText.slice(0, userText.length - 1);
    return display.removeChild(display.lastChild);
  }

  // these are the valid character we are allowing to type
  const validLetters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ 1234567890!@#$%^&*()_+-={}[]'\".,?";

  // if it is not a valid character like Control/Alt then skip displaying anything
  if (!validLetters.includes(newLetter)) {
    return;
  }

  userText += newLetter;

  const newLetterCorrect = validate(newLetter);
  if (newLetterCorrect) {
    display.innerHTML += `<span class="green">${
      newLetter === " " ? "▪" : newLetter
    }</span>`;
  } else {
    a++;
    display.innerHTML += `<span class="red">${
      newLetter === " " ? "▪" : newLetter
    }</span>`;
  }

  // check if given question text is equal to user typed text
  if (questionText === userText) {
    endType = new Date().getTime();

    let typeDiffer = Math.ceil((endType - startType) / 1000);
    wordInMin = Math.ceil((questionText.length * 60) / typeDiffer);
    console.log(wordInMin);
    gameOver();
  }
};
