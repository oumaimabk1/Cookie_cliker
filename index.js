import * as bootstrap from "bootstrap";
import { getPlayers, updatecurrentPlayer, getOnePlayer,resetPlayer } from './Apicookies';
import { Notyf } from 'notyf';

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'right',
    y: 'top',
  },
  types: [
    {
      type: 'success',
      background: 'vert',
      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'light'
      }
    },
    {
      type: 'error',
      background: 'rouge',
      duration: 3000,
      
    }
  ]
});
const user = window.localStorage.getItem("user");
if (!user){
  window.location.href='./login.html'
}else{
//fonction incrémentation 
let score = 0;
let multiplier = 1;
// les variables
const viewScore = document.getElementById("viewScore");
//recuperer les multiplicateur du base de donnees et afficher les bouttons 
const buttons = document.getElementById('buttons');
const buttonClicker = document.getElementById("clicker");
const messages = document.getElementById('messages');

//display meuilleur score
const displayMeilleurscore = async()=>{
  let allPlayers = await getPlayers()
  let palyer = window.localStorage.getItem("user");
  let currentPlayer = await getOnePlayer(JSON.parse(palyer).id)
  console.log(currentPlayer)
  document.getElementById('player').innerText += currentPlayer.name ,
  viewScore.innerHTML = currentPlayer.score || 0;
  let scores = allPlayers.map(el => el.score ? el.score : 0);
  document.getElementById('best_score').innerText += Math.max(...scores) 
}
displayMeilleurscore()
//display banque

const displayBanque = async () => {
  let palyer = window.localStorage.getItem("user");
  let currentPlayer = await getOnePlayer(JSON.parse(palyer).id)
  let multipli = currentPlayer.multiplicateur[0]
  let numberOfBuy = multipli.filter(el => el.numberOfBuy != 0)
  //let numberOfBuy = []
  if (numberOfBuy.length === 0) {
    messages.parentNode.style.display = "none";;
  }
  for (var i = 0; i < numberOfBuy.length; i++) {
    var item = document.createElement("li");
    item.innerHTML = `<li class="btn m-2 text-info bg-dark">
    Vous avez acheté le ticket ${numberOfBuy[i].name} ${numberOfBuy[i].numberOfBuy} fois avec ${numberOfBuy[i].TotalCost} points</li>`;
    messages.appendChild(item);
  }
}
displayBanque()

const getAllMultiplicateur = async () => {
  let palyer = window.localStorage.getItem("user");
  let currentPlayer = await getOnePlayer(JSON.parse(palyer).id)
  let multipli = currentPlayer.multiplicateur[0]
  
  buttons.innerHTML =
    `  <span> 
  <button type="button" class="btn btn-info text-info  m-2 btn-losange" id="btn-multi-2" valeur="200">
  <span class='top'>${multipli[0].multi}</span>
  X
  <span class='bottom'>${multipli[0].cost}</span></button>
</span>
<span> 
  <button type="button" class=" btn btn-success text-success  m-2 btn-losange" id="btn-multi-4">
  <span class='top'>${multipli[1].multi}</span>
  Y
  <span class='bottom'>${multipli[1].cost}</span></button>
</span>
<span> 
  <button type="button" class="  btn btn-warning text-warning  m-2 btn-losange" id="btn-auto">
  <span class='top'>auto</span>
  O
  <span class='bottom'>${multipli[2].cost}</span></button>
</span>
<span> 
  <button type="button" class="  btn btn-primary text-primary  m-2 btn-losange" id="btn-bonus">
  <span class='top'>bonus</span>
  B
  <span class='bottom'>${multipli[3].cost}</span>
  <span id='timer'></span></button>
</span>
<span> 
  <button type="button" class=" btn btn-danger text-danger  m-2 btn-losange" id="btn-reset">reset</button>
</span>  `

  //declare buttons

  const btnAuto = document.getElementById("btn-auto");
  const btnBonus = document.getElementById("btn-bonus");
  const btnReset = document.getElementById("btn-reset");


  let allButtons = document.querySelectorAll('button');
  //ici j'ai recuperer tous les bouttons, comme la premiere d'indice 0 est 
  //le boutton clicker j'ai commencé par le boutto n2 d'indice 1
  for (let i = 2; i < 6; i++) {
    allButtons[i].disabled = score < multipli[i - 2].cost
    if (i < 4) {
      allButtons[i].addEventListener('click', () => {
        console.log(multipli[i - 2].multi)
        buyMulti(multipli[i - 2].multi, multipli[i - 2].cost)
        //update score and cost
        updatecurrentPlayer(score, multipli[i - 2])
        getAllMultiplicateur()
        messages.innerHTML = "";
        displayBanque()
      })
    }
  }

  //boutton autoClick
  btnAuto.addEventListener("click", () => {
    buyAutoClick(multipli[2].cost);
    //update score and cost
    updatecurrentPlayer(score, multipli[2])
    getAllMultiplicateur()
    messages.innerHTML = "";
    displayBanque()
  });

  //boutton bonus
  btnBonus.addEventListener("click", () => {
    buyBonus(multipli[3].cost);
    //update score and cost
    updatecurrentPlayer(score, multipli[3])
    getAllMultiplicateur()
    messages.innerHTML = "";
    displayBanque()
  });

  //boutton reset 
  btnReset.addEventListener("click", () => {
    let conf = confirm("Are you sure you want to rest the game?");
    console.log(conf)
    if (conf) {
      resetPlayer()
      setTimeout(()=>{
        location.reload()
      },1000) 
    } 
  });

}

getAllMultiplicateur();

let startBonus;
//boutton clicker
buttonClicker.addEventListener("click", () => {
  if (startBonus) {
    if (startBonus >= 0) {
      score *= 2;
      //  le score sera multiplié par 2 chaque 30 secondes
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


// fonction pour achat multi2/4
function buyMulti(multipli, cost) {
  console.log(multipli, cost)
  if (score >= cost) {
    score -= cost;
    viewScore.innerText = score;
    multi(multipli);
    notyf.success(`Option activée. Le nouveau prix est de : ${cost*2} points`);
    getAllMultiplicateur();
  } else {
    notyf.error("Vous n'avez pas assez d'argent");
  }
}
//fonction multi*4/2
function multi(multipli) {
  multiplier = multipli;
  viewScore.innerText = score;
  setTimeout(function () {
    notyf.success('option expirée')
    multiplier = 1;
  }, 30000);
}

//fonction autoClick
function autoClick() {
  let autoClick =
    setInterval(() => {
      //incrémente le score de 10  toute les 5 secondes pendant 10s
      score += 10;
      viewScore.textContent = score;
    }, 1000);
  setTimeout(() => {
    notyf.success('option expirée')
    clearInterval(autoClick);
  }, 30000);
}

// fonction pour achat autoClick
function buyAutoClick(costAutoClick) {
  if (score >= costAutoClick) {
    score -= costAutoClick;       // déduire le prix d'achat du score 
    viewScore.innerText = score; // update le score
    autoClick()
    notyf.success(`Option activée. Le nouveau prix est de : ${cost*2} points`);

    getAllMultiplicateur();
  }
}

//fonction bonus
function bonus() {
  startBonus = 5;
  setInterval(() => {
    if (startBonus >= 0) {
      document.getElementById('timer').innerText = startBonus;
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
    notyf.success(`Option activée. Le nouveau prix est de : ${cost*2} points`);
    getAllMultiplicateur();
  } else {
    notyf.error("Vous n'avez pas assez de points!");// pas nécessaire car boutton désactivé
  }
}
//fonction reset mais en backend
}