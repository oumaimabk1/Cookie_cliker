import * as bootstrap from 'bootstrap'

const buttonClicker = document.getElementById('clicker')
const score = document.getElementById('score')

let count = 0;
buttonClicker.addEventListener('click',()=>{
   count ++;
   score.innerText=count;
});

