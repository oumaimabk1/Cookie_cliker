import * as bootstrap from "bootstrap";

const buttonClicker = document.getElementById("clicker");
const score = document.getElementById("score");
const btnBonus = document.getElementById("btn-bonus");
const timer = document.getElementById("timer");

let count = 0;
let muliplicateur = 1;

const increment = () => {
    count += muliplicateur;
    score.innerText = count;
};



buttonClicker.addEventListener("click", () => {
  increment();
});


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
