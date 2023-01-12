import * as bootstrap from "bootstrap";

//Déclarations des variables
const buttonClicker = document.getElementById("clicker");
const viewScore = document.getElementById("viewScore");
const btnBonus = document.getElementById("btn-bonus");
const timer = document.getElementById("timer"); //le joueur devrait voir une minuterie avec le temps restant à l'intérieur du bouton bonus.
const btnAuto = document.getElementById("btn-auto");

const btnMulti2 = document.getElementById("btn-multi-2");
const btnMulti4 = document.getElementById("btn-multi-4");
const btnReset = document.getElementById("btn-reset");

let score = 0;
let muliplicateur = 1;

const increment = () => {
  score += muliplicateur;
  viewScore.innerText = score;
};

btnMulti2.addEventListener("click", () => {
    alert('hello')
  console.log("tets");
  muliplicateur = 2;
  increment();
});

btnMulti4.addEventListener("click", () => {
  console.log("tets");
  muliplicateur = 4;
  score += 4;
  viewScore.innerText = score;
  //increment();
});

btnAuto.addEventListener("click", () => {
  setInterval(function () {
    //incrémente le score de 10  toute les 5 secondes
    score += 10;
    viewScore.textContent = score;
  }, 5000);
});

// boutton reset // rest ok

btnReset.addEventListener("click", () => {
  location.reload();
});

let startBonus;
btnBonus.addEventListener("click", () => {
  //le boutton bonus doit accorder un boost de score de 200%
  startBonus = 5;
  setInterval(() => {
    if (startBonus >= 0) {
      timer.innerText = startBonus;
    } else {
      timer.innerText = "Time out!";
    }
    startBonus >= 0 ? startBonus-- : startBonus;
  }, 1000);
});

//boutton clicker
buttonClicker.addEventListener("click", () => {
  console.log(startBonus);
  if (startBonus) {
    if (startBonus >= 0) {
      score *= 2;
      console.log(score); //  le score sera multiplié par 2 chaque 30 secondes
      viewScore.innerText = score;
    } else {
      increment();
    }
  } else {
    increment();
  }
});
