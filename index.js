import * as bootstrap from "bootstrap";
import { getMultiplicateur,updatecurrentPlayer,getOnePlayer } from './Apicookies';
//header

//fonction incrémentation 
let score = 0;
let multiplier = 1;
let tabMultiplicator = [];

//recuperer les multiplicateur du base de donnees et afficher les bouttons 
const buttons = document.getElementById('buttons'); 
const buttonClicker = document.getElementById("clicker");


//initialize

const getAllMultiplicateur = async () => {
  let palyer = window.localStorage.getItem("user");
  let currentPlayer = await getOnePlayer(JSON.parse(palyer).id)
  
  let multipli = currentPlayer.multiplicateur[0]

  buttons.innerHTML =
    `
 <button type="button" class="btn btn-primary m-2" id="btn-multi-2" disabled>
   <div>
   <p>*${multipli[0].multi} <span> cost ${multipli[0].cost}</span></p>
   </div>
 </button>
 <button type="button" class="btn btn-primary m-2" id="btn-multi-4" disabled>
 <div>
 <p>*${multipli[1].multi} <span> cost ${multipli[1].cost}</span></p>
 </div>
  </button>
  <button type="button" class="btn btn-primary m-2" id="btn-auto" disabled>
     auto-click <span> cost ${multipli[2].cost}</span></p>
  </button>
  <button type="button" class="btn btn-primary m-2" id="btn-bonus" disabled>
     <p> bonus    
     <span> cost ${multipli[2].cost}</span></p>     
  <span id="timer"></span></p>
  </button>
  <button type="button" class="btn btn-danger m-2" id="btn-reset">
      reset
  </button>
  `
  //declare buttons
  
  const btnAuto = document.getElementById("btn-auto");
  const btnBonus = document.getElementById("btn-bonus");
  const btnReset = document.getElementById("btn-reset");


  let allButtons = buttons.children;

  for (let i = 0; i< 4 ; i ++) {
    allButtons[i].disabled = score < multipli[i].cost
    if(i<2){
      allButtons[i].addEventListener('click', () => {
        buyMulti(multipli[i].multi, multipli[i].cost)
        //update score and cost
        updatecurrentPlayer(score,multipli[i])
        getAllMultiplicateur()
      })
    }
   
  }

  //boutton autoClick
  btnAuto.addEventListener("click", () => {
    buyAutoClick(multipli[2].cost);
    //update score and cost
    updatecurrentPlayer(score,multipli[2])
        getAllMultiplicateur()
  });

  //boutton bonus
  btnBonus.addEventListener("click", () => {
    buyBonus(multipli[3].cost);
    //update score and cost
    updatecurrentPlayer(score,multipli[3])
        getAllMultiplicateur()
  });

  //boutton reset 
  btnReset.addEventListener("click", () => {
    location.reload();
  });

  return multipli
}

getAllMultiplicateur();

//fonction condition d'achat d'option
function condition(btn, cost) {
  return btn.disabled = score < cost
}
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

const increment = () => {
  score += multiplier;
  viewScore.innerText = score;
  getAllMultiplicateur();
};

// les variables
const viewScore = document.getElementById("viewScore");

// fonction pour achat multi2/4
function buyMulti(multiplier, cost) {
  multi(multiplier);
  if (score >= cost) {
    score -= cost;
    viewScore.innerText = score;
    multi(multiplier);
    // augmente le prix pour le prochain achat 
    alert("Option activée. Le nouveau prix est de: " );
    //btnMulti2.textContent = "Multi*2 ----" + costMulti2
    getAllMultiplicateur();
  }
}
//fonction multi*4/2
function multi(multiplier) {
  multiplier = multiplier;
  viewScore.innerText = score;
  setTimeout(function () {
    multiplier = 1;
  }, 15000);
}

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
function buyAutoClick(costAutoClick) {
  if (score >= costAutoClick) {
    score -= costAutoClick;       // déduire le prix d'achat du score 
    viewScore.innerText = score; // update le score
    autoClick()
    costAutoClick *= 2;
    alert("Option activée. Le nouveau prix est de: " );
    // btnAuto.textContent = "Auto-Click-- " + costAutoClick ;
    getAllMultiplicateur();
  }
}

//fonction bonus
function bonus() {
  startBonus = 5;
  setInterval(() => {
    if (startBonus >= 0) {
       " Timer: " + startBonus;
    } 
    startBonus >= 0 ? startBonus-- : startBonus;
  }, 1000);
}

// fonction pour achat bonus
function buyBonus(costBonus) {
  if (score >= costBonus) {
    score -= costBonus;
    viewScore.innerText = score;
    bonus()
    costBonus *= 4;
    alert("Option activée. Le nouveau prix est de: " );
    getAllMultiplicateur();
  } else {
    alert("Vous n'avez pas assez de points!");// pas nécessaire car boutton désactivé
  }
}


