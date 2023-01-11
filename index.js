
import * as bootstrap from "bootstrap";

//Déclarations des variables 
const buttonClicker = document.getElementById('clicker')
const viewScore = document.getElementById("viewScore")
const btnBonus = document.getElementById('btn-bonus')
const timer = document.getElementById('timer')         //le joueur devrait voir une minuterie avec le temps restant à l'intérieur du bouton bonus.
const btnAuto = document.getElementById("btn-auto");
const btnReset = document.getElementById("btn-reset" );


let score = 0;
let muliplicateur = 1;

const increment = () => {
   score += muliplicateur;
    viewScore.innerText = score;
};


//boutton clicker

buttonClicker.addEventListener("click", () => {
  increment();
});

/*
//boutton Bonus // test ok 

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

*/

/*
// boutton auto-click // test ok 
// mais à améliorer car il fait rien de spécial 
// il faut l'incrémenter de 50 ou 100 et faire en sorte qu'il foctionne en meme temps que le clicker !!

btnAuto.addEventListener("click", () => {
   let i = 30; 

   let clickPerSecond = setInterval(() => {  // A chaque seconde le score s'incrémente de 1 pendant 30s 
      increment();
      timer.innerText = i;
      i--;
   }, 1000);

   setTimeout(() => {                        // apres 30s le compteur arrete de s'incrémenter
      clearInterval(clickPerSecond);
      timer.innerText = "Time out!";
   }, 30000);

});



*/
btnAuto.addEventListener("click", () => {
   setInterval(function(){                   //incrémente le score de 10  toute les 5 secondes
      score+=10;
      viewScore.textContent = score;
  }, 5000);                            
});


// boutton reset // rest ok 

btnReset.addEventListener("click", () =>{
   location.reload();
});




btnBonus.addEventListener("click", () => {  //le boutton bonus doit accorder un boost de score de 200%
   let i = 30;
 
   setInterval(() => {
     if(i>= 0){
         timer.innerText = i;             //le joueur devrait voir une minuterie avec le temps restant à l'intérieur du bouton bonus.
         score *= 2;                      //  le score sera multiplié par 2 chaque 30 secondes  
         viewScore.innerText = score;            
     }else{
         timer.innerText = "Time out!"; 
     }
     i--;
   }, 30000);
 });

