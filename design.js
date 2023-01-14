
let canvas = document.querySelectorAll('.canvas')
console.log(canvas)
canvas.forEach(button =>{
  button.getContext('2d'),side = 0,
  size = 100,
  x = 100,
  y = 100;
  let context = button.getContext("2d")
  context.beginPath();
  canvas.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
  
  for (side; side < 7; side++) {
    canvas.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
  }
  
  canvas.fillStyle = "#fff";
  canvas.fill();
})
