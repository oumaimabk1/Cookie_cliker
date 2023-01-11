import * as bootstrap from 'bootstrap'
//Déclarations des variables 
const buttonClicker = document.getElementById('clicker')
const score = document.getElementById('score')
const btnBonus = document.getElementById('btn-bonus')
const timer = document.getElementById('timer')
const btnAuto = document.getElementById("btn-auto");

let count = 0;

const increment =()=>{
   count ++;
   score.innerText=count;
}
buttonClicker.addEventListener('click',()=>{
    increment()
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



