
import * as bootstrap from "bootstrap";

//Déclarations des variables 
const buttonClicker = document.getElementById('clicker')
const score = document.getElementById('score')
const btnBonus = document.getElementById('btn-bonus')
const timer = document.getElementById('timer')
const btnAuto = document.getElementById("btn-auto");


let count = 0;
let muliplicateur = 1;

const increment = () => {
    count += muliplicateur;
    score.innerText = count;
};


//boutton clicker

buttonClicker.addEventListener("click", () => {
  increment();
});

//boutton Bonus

btnBonus.addEventListener("click", () => {
  let i = 30;

  setInterval(() => {
    if(i>= 0){
        timer.innerText = i;
        muliplicateur = 200;
    }else{
        timer.innerText = "Time out!";
        muliplicateur = 1;
    }
   
    i--;
  }, 1000);

});



// boutton auto-click

btnAuto.addEventListener("click", () => {

   timer // fonction qui déclenche le timer de 30s

   let clickPerSecond = setInterval(() => {  // A chaque seconde le count s'incrémente de 1 pendant 30s 

      increment()
   }, 1000);

   if (timer === 0) {                     // apres 30s le compteur arrete de s'incrémenter
      function finish30s() {
         clearInterval(clickPerSecond);  
      }
   }

 
});




