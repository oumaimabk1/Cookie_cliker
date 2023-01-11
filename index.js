import * as bootstrap from 'bootstrap'

const buttonClicker = document.getElementById('clicker')
const score = document.getElementById('score')
const btnBonus = document.getElementById('btn-bonus')
const timer = document.getElementById('timer')


let count = 0;
buttonClicker.addEventListener('click',()=>{
    increment()
});

const increment =()=>{
    count ++;
    score.innerText=count;
}
