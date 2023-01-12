import * as bootstrap from "bootstrap";

// les bouttons 
const buttonClicker = document.getElementById("clicker");
const btnMulti2 = document.getElementById("btn-multi-2");
const btnMulti4 = document.getElementById("btn-multi-4");
const btnAuto = document.getElementById("btn-auto");
const btnBonus = document.getElementById("btn-bonus");
const btnReset = document.getElementById("btn-reset");
//input username
const userInput = document.getElementById("username");
const btnStart = document.getElementById("start-game");
//header
const currentPlayer = document.getElementById("player");

// les variables
const viewScore = document.getElementById("viewScore");
const timer = document.getElementById("timer"); //le joueur devrait voir une minuterie avec le temps restant à l'intérieur du bouton bonus.

// le prix des options
let costMulti2 = 5;
let costMulti4 = 8;
let costAutoClick = 10;
let costBonus = 12;

//fonction incrémentation 
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

//fonction multi*2
function multi2() {
  muliplicateur = 2;
  viewScore.innerText = score;
}

// fonction pour achat multi2
function buyMulti2() {
  if (score >= costMulti2 ) {
     score -= costMulti2;       
     viewScore.innerText = score; 
     multi2()
  } else {
     alert("Vous n'avez pas assez de points!");
  }
}

//boutton multi2
btnMulti2.addEventListener("click", () => {
  buyMulti2();
});

//fonction multi*4
function multi4() {
  muliplicateur = 4;
  viewScore.innerText = score;
}

// fonction pour achat multi4
function buyMulti4() {
  if (score >= costMulti4 ) {
     score -= costMulti4;       
     viewScore.innerText = score; 
     multi4()
  } else {
     alert("Vous n'avez pas assez de points!");
  }
}

//boutton multi4
btnMulti4.addEventListener("click", () => {
  buyMulti4()
});

//fonction autoClick
function autoClick() {
  setInterval(function () {
     //incrémente le score de 10  toute les 5 secondes
     score += 10;
     viewScore.textContent = score;
   }, 5000);
}

// fonction pour achat autoClick
function buyAutoClick() {
  if (score >= costAutoClick ) {
     score -= costAutoClick;       // déduire le prix d'achat du score 
     viewScore.innerText = score; // update le score
     autoClick()
  } else {
     alert("Vous n'avez pas assez de points!");
  }
}

//boutton autoClick
btnAuto.addEventListener("click", () => {
  buyAutoClick();
});

//fonction bonus
let startBonus;
function bonus() {
   startBonus = 5;
  setInterval(() => {
    if (startBonus >= 0) {
      timer.innerText = startBonus;
    } else {
      timer.innerText = "Time out!";
    }
    startBonus >= 0 ? startBonus-- : startBonus;
  }, 1000);
}

// fonction pour achat bonus
function buyBonus() {
  if (score >= costBonus ) {
     score -= costBonus;       
     viewScore.innerText = score; 
     bonus()
  } else {
     alert("Vous n'avez pas assez de points!");
  }
}

//boutton bonus
btnBonus.addEventListener("click", () => {
  buyBonus();
});

//boutton reset 
btnReset.addEventListener("click", () => {
  location.reload();
});





