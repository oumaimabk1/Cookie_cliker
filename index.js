import * as bootstrap from "bootstrap";

//input username
const userInput = document.getElementById("username");
const btnStart = document.getElementById("start-game");


//header
const currentPlayer = document.getElementById("player");
//page 1
let palyer = window.localStorage.getItem("player");

//oDomElement.style.backgroundImage = "url(/images/exemple/grille150.gif), url(/images/exemple/filter-image.jpg)";

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
  document.querySelector('#page1').classList.remove('d-flex');

});

// les bouttons 
const buttonClicker = document.getElementById("clicker");
const btnMulti2 = document.getElementById("btn-multi-2");
const btnMulti4 = document.getElementById("btn-multi-4");
const btnAuto = document.getElementById("btn-auto");
const btnBonus = document.getElementById("btn-bonus");
const btnReset = document.getElementById("btn-reset");

// les variables
const viewScore = document.getElementById("viewScore");


// le prix des options
let costMulti2 = 5;
let costMulti4 = 8;
let costAutoClick = 10;
let costBonus = 12;

// affichage des prix
btnMulti2.textContent = "Multi*2 ----" + costMulti2
btnMulti4.textContent = "Multi*4 ----" + costMulti4
btnAuto.textContent = "AutoClick ----" + costAutoClick
btnBonus.textContent = "Bonus ----" + costBonus

//fonction condition d'achat d'option
function condition(btn,cost) {
  return btn.disabled = score >= cost ? false : true
}

//fonction incrémentation 
let score = 0;
let muliplicateur = 1;

const increment = () => {
  score += muliplicateur;
  viewScore.innerText = score;
  condition(btnMulti2,costMulti2);
  condition(btnMulti4,costMulti4);
  condition(btnAuto ,costAutoClick);
  condition(btnBonus ,costBonus);
};


let startBonus;
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
     condition(btnMulti2,costMulti2) 
     viewScore.innerText = score; 
     multi2();
     costMulti2 *= 2; // augmente le prix pour le prochain achat 
     alert("Option activée. Le nouveau prix est de: " + costMulti2);
     btnMulti2.textContent = "Multi*2 ----" + costMulti2
     
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
     condition(btnMulti4,costMulti4);      
     viewScore.innerText = score; 
     multi4()
     costMulti4 *= 3; 
     alert("Option activée. Le nouveau prix est de: " + costMulti4);
     btnMulti4.textContent = "Multi*4 ----" + costMulti4
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
  let autoClick = 
  setInterval(() => {
     //incrémente le score de 10  toute les 5 secondes pendant 10s
     score += 10;
     viewScore.textContent = score;
   }, 5000);
   setTimeout(() => {
    clearInterval(autoClick);
  }, 10000);
}

// fonction pour achat autoClick
function buyAutoClick() {
  if (score >= costAutoClick ) {
     score -= costAutoClick;       // déduire le prix d'achat du score 
     condition(btnAuto ,costAutoClick);
     viewScore.innerText = score; // update le score
     autoClick()
     costAutoClick *= 2; 
     alert("Option activée. Le nouveau prix est de: " + costAutoClick);
     btnAuto.textContent = "Auto-Click-- " + costAutoClick ;
  }
}

//boutton autoClick
btnAuto.addEventListener("click", () => {
  buyAutoClick();
});

//fonction bonus
function bonus() {
   startBonus = 5;
  setInterval(() => {
    if (startBonus >= 0) {
      btnBonus.textContent = "Bonus-- " + costBonus + " Timer: " + startBonus;
    } else {
      btnBonus.textContent = "Bonus-- " + costBonus;
    }
    startBonus >= 0 ? startBonus-- : startBonus;
  }, 1000);
}

// fonction pour achat bonus
function buyBonus() {
  if (score >= costBonus ) {
     score -= costBonus;    
     condition(btnBonus ,costBonus);   
     viewScore.innerText = score; 
     bonus()
     costBonus *= 4; 
     alert("Option activée. Le nouveau prix est de: " + costBonus);
     btnBonus.textContent = "Bonus-- " + costBonus;
  } else {
     alert("Vous n'avez pas assez de points!");// pas nécessaire car boutton désactivé
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