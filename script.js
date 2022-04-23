"use strict";

const countriesContainer1 = document.querySelector(".countries1");
const countriesContainer2 = document.querySelector(".countries2");

const createCountry1 = function (data, className = "") {
  const html = `
  <div class="country">
    <img class="country-flag" src="${data.flag}" />
    <div class="country-name-box">
      <h3 class="country-name">${data.name}</h3>
    </div>
  </div>
  `;
  countriesContainer1.insertAdjacentHTML("beforeend", html);
  countriesContainer1.style.opacity = 1;
};

const createCountry2 = function (data, className = "") {
  const html = `
  <div class="country">
    <img class="country-flag" src="${data.flag}" />
    <div class="country-name-box">
      <h3 class="country-name">${data.name}</h3>
    </div>
  </div>
  `;
  countriesContainer2.insertAdjacentHTML("beforeend", html);
  countriesContainer2.style.opacity = 1;
};

const renderError1 = function (message) {
  countriesContainer1.insertAdjacentText("beforeend", message);
  countriesContainer1.style.opacity = 1;
};

const renderError2 = function (message) {
  countriesContainer2.insertAdjacentText("beforeend", message);
  countriesContainer2.style.opacity = 1;
};

let country1 = prompt(
  `Player 1 type in the name of the country that you want to represent!

  *** NOTICE: The name of the country must be written on english!!! ***`
);
let country2 =
  prompt(`Player 2 type in the name of the country that you want to represent!

*** NOTICE: The name of the country must be written on english!!! ***`);

const getCountryData1 = async function (country) {
  try {
    // Country data
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);

    if (!res.ok)
      throw new Error(`Country cannot be found. 
    Start a NEW GAME or REFRESH the page.
    Country name MUST be written on english`);

    const data = await res.json();
    console.log(data);
    createCountry1(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError1(`💥 ${err.message}`);
  }
};

const getCountryData2 = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);

    if (!res.ok)
      throw new Error(`Country cannot be found. 
    Start a NEW GAME or REFRESH the page.
    Country name MUST be written on english`);

    const data = await res.json();
    console.log(data);
    createCountry2(data[0]);
  } catch (err) {
    console.error(`${err} 💥`);
    renderError2(`💥 ${err.message}`);
  }
};
getCountryData1(country1);
getCountryData2(country2);

const player1 = document.querySelector(".player-0");
const player2 = document.querySelector(".player-1");
const score1 = document.getElementById("player-score-0");
const score2 = document.getElementById("player-score-1");
const currentScore1 = document.getElementById("current-score-0");
const currentScore2 = document.getElementById("current-score-1");
const buttonNewGame = document.querySelector(".btn-new-game");
const buttonRollDice = document.querySelector(".btn-roll-dice");
const buttonSaveScore = document.querySelector(".btn-save-score");
const dice = document.querySelector(".dice");

let playerActive;
let playing;
let scores;
let currentScore;

const startingValues = function () {
  playerActive = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  dice.classList.add("hidden");
  player1.classList.remove("winner");
  player2.classList.remove("winner");
  player1.classList.add("active");
  player2.classList.remove("active");
};

startingValues();

const playerChange = function () {
  document.getElementById(`current-score-${playerActive}`).textContent = 0;
  currentScore = 0;
  if (playerActive === 0) {
    playerActive = 1;
  } else {
    playerActive = 0;
  }
  player1.classList.toggle("active");
  player2.classList.toggle("active");
};

buttonRollDice.addEventListener("click", function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove("hidden");
    dice.src = `img/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-score-${playerActive}`).textContent =
        currentScore;
    } else {
      playerChange();
    }
  }
});

buttonSaveScore.addEventListener("click", function () {
  if (playing) {
    scores[playerActive] += currentScore;
    document.getElementById(`player-score-${playerActive}`).textContent =
      scores[playerActive];

    if (scores[playerActive] >= 100) {
      playing = false;
      dice.classList.add("hidden");
      document.querySelector(`.player-${playerActive}`).classList.add("winner");
      document
        .querySelector(`.player-${playerActive}`)
        .classList.remove("active");
      document.querySelector(`#name-${playerActive}`).textContent = "WINNER";
    } else {
      playerChange();
    }
  }
});

buttonNewGame.addEventListener("click", function () {
  startingValues();

  function removeCountry(country) {
    while (country.firstChild) {
      country.removeChild(country.firstChild);
    }
  }
  const container1 = document.querySelector(".countries1");
  const container2 = document.querySelector(".countries2");

  removeCountry(container1);
  removeCountry(container2);

  let country1 = prompt(
    `Player 1 type in the name of the country that you want to represent!

    *** NOTICE: The name of the country must be written on english!!! ***`
  );
  let country2 =
    prompt(`Player 2 type in the name of the country that you want to represent!

  *** NOTICE: The name of the country must be written on english!!! ***`);

  getCountryData1(country1);
  getCountryData2(country2);
});
