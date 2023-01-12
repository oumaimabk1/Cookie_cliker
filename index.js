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
//input username
const userInput = document.getElementById("username");
const btnStart = document.getElementById("start-game");
//header
const currentPlayer = document.getElementById("player");

let score = 0;
let muliplicateur = 1;
let palyer = window.localStorage.getItem("player");

//afficher une page d'authentification

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? "block" : "none";
}


  if (palyer) {
    setVisible("#page2", true);
    setVisible("#page1", false);
  } else {
    setVisible("#page2", false);
    setVisible("#page1", true);
  }

let name;
userInput.addEventListener("change", (e) => {
  name = e.target.value;

  if (name.length > 4) {
    btnStart.disabled = false;
  }
});

btnStart.addEventListener("click", () => {
  window.localStorage.setItem("player", name);
  currentPlayer.innerText = "Player :" + name;
  setVisible("#page2", true);
  document.querySelector('#page1').classList.add('d-none');

});

//page 2
const increment = () => {
  score += muliplicateur;
  viewScore.innerText = score;
};

btnMulti2.addEventListener("click", () => {
  muliplicateur = 2;
  //prix va etre récupérer du html
  //augmenter le prix
});

btnMulti4.addEventListener("click", () => {
  muliplicateur = 4;
});

btnAuto.addEventListener("click", () => {
  setInterval(function () {
    //incrémente le score de 10  toute les 5 secondes
    score += 10;
    viewScore.textContent = score;
  }, 5000);
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
// boutton reset // rest ok

btnReset.addEventListener("click", () => {
  location.reload();
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
