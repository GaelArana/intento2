let wordToGuess = "";
let hint = "";
let attemptsLeft = 7;
let guessedLetters = [];

function startGame() {
  wordToGuess = document.getElementById("wordInput").value.trim().toUpperCase();
  hint = document.getElementById("hint").value.trim();
  guessedLetters = [];
  attemptsLeft = 7;

  const wordWarning = document.getElementById("wordWarning");
  const hintWarning = document.getElementById("hintWarning");
  wordWarning.innerText = "";
  hintWarning.innerText = "";

  if (wordToGuess.length === 0) {
    wordWarning.innerText = "Debes ingresar una palabra.";
    return;
  }

  if (wordToGuess.length === 1) {
    wordWarning.innerText = "La palabra debe tener más de una letra.";
    return;
  }

  if (hint.length === 0) {
    hintWarning.innerText = "Debes ingresar una pista o definición.";
    return;
  }

  if (hint.length === 1) {
    hintWarning.innerText = "La pista o definición debe tener más de una letra";
    return;
  }

  if (/[^A-Za-z]/.test(wordToGuess)) {
    wordWarning.innerText = "La palabra no puede contener signos o números. Ingresa solo letras.";
    return;
  }

  if (/[^A-Za-z]/.test(hint)) {
    hintWarning.innerText = "La pista no puede contener signos o números. Ingresa solo letras.";
    return;
  }

  document.querySelector(".start-section").style.display = "none";
  document.querySelector(".game-section").style.display = "block";

  resetHangman();

  document.getElementById("hintDisplay").innerText = `Pista: ${hint}`;

  updateWordDisplay();

  document.querySelector(".attempts-section button").disabled = false;
}

function isValidLetter(letter) {
  return /^[A-Za-z]$/.test(letter);
}

function checkLetter() {
  const letterInput = document.getElementById("letterInput");
  const letter = letterInput.value.trim().toUpperCase();

  letterInput.value = "";

  if (!isValidLetter(letter)) {
    alert("Ingresa una letra válida (A-Z).");
    return;
  }

  if (guessedLetters.includes(letter)) {
    alert("Ya has ingresado esta letra antes.");
    return;
  }

  const letterWarning = document.getElementById("letterWarning");
  letterWarning.innerText = "";
  
  guessedLetters.push(letter);

  if (wordToGuess.includes(letter)) {
    if (checkIfWordGuessed()) {
      displayGameState("¡Felicidades! Has adivinado la palabra.");
      endGame();
    } else {
      displayGameState(`¡Letra correcta!`);
    }
  } else {
    attemptsLeft--;

    updateHangman();

    if (attemptsLeft === 0) {
      displayGameState(`¡Has perdido! La palabra era: ${wordToGuess}`);
      endGame();
    } else {
      displayGameState(`¡Letra incorrecta! Te quedan ${attemptsLeft} intentos.`);
    }
  }

  updateWordDisplay();  

}
function updateWordDisplay() {
  const wordDisplay = document.getElementById("wordDisplay");
  let displayText = "";

  for (const letter of wordToGuess) {
    if (guessedLetters.includes(letter)) {
      displayText += letter + " ";
    } else {
      displayText += "_ ";
    }
  }

  wordDisplay.innerText = displayText.trim();

  if (displayText.indexOf("_") === -1) {
    displayGameState("¡Felicidades! Has adivinado la palabra.");
    endGame();
  }
}

function checkIfWordGuessed() {
  for (const letter of wordToGuess) {
    if (!guessedLetters.includes(letter)) {
      return false;
    }
  }
  return true;
}

function updateHangman() {
  const hangmanParts = document.querySelectorAll(".hangman div");
  const incorrectAttempts = 7 - attemptsLeft;

  for (let i = 0; i < hangmanParts.length; i++) {
    if (i < incorrectAttempts) {
      hangmanParts[i].style.display = "block";
    } else {
      hangmanParts[i].style.display = "none";
    }
  }
}

function resetHangman() {
  const hangmanParts = document.querySelectorAll(".hangman div");

  for (const part of hangmanParts) {
    part.style.display = "none";
  }
}

function goToStart() {
  document.querySelector(".start-section").style.display = "block";
  document.querySelector(".game-section").style.display = "none";
  document.getElementById("letterInput").disabled = false;
  document.getElementById("wordInput").value = "";
  document.getElementById("hint").value = "";
  document.getElementById("letterInput").value = "";
  document.getElementById("wordDisplay").innerText = "";
  document.getElementById("hintDisplay").innerText = "";
  document.getElementById("gameState").innerText = "";
  guessedLetters = [];
  attemptsLeft = 7;
  resetHangman();
}

function displayGameState(message) {
  const gameStateElement = document.getElementById("gameState");
  gameStateElement.innerText = message;
}

function endGame() {
  document.getElementById("letterInput").disabled = true;
  document.getElementById("letterInput").value = "";
  document.querySelector(".attempts-section button").disabled = true;
}

function goToRules() {
  window.location.href = "rules.html";
}

function goToGame() {
  window.location.href = "index.html";
}

function goToHistory() {
  window.location.href = "history.html";
}


