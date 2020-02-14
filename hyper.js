const cursor = document.querySelector('div.cursor')
const canvasIn = document.querySelector('canvas.in')
const canvasOut = document.querySelector('canvas.out')

let isMouseDown = false
//make cursor bigger on hold

const growCursor = function() {
  cursor.classList.add('is-down')
  //cursor.innerHTML = `<span>Let go please!</span>`
}

// shrink cursor when release
const shrinkCursor = function() {
  cursor.classList.remove('is-down')
  // cursor.innerHTML = `<span>Click me</span>`
}

//move cursor based on coordinates
const moveCursor = function(x, y) {
  cursor.style.left = x + 'px'
  cursor.style.top = y + 'px'
}

//set up canvas
const setupCanvas = function(canvas) {
  const w = window.innerWidth
  const h = window.innerHeight
  const dpi = window.devicePixelRatio

  canvas.width = w * dpi
  canvas.height = h * dpi
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'

  //which context are we talking about? 2d
  const context = canvas.getContext('2d')
  context.scale(dpi, dpi)

  if (canvas.classList.contains("in")){
    context.fillStyle = '#000000'
  context.strokeStyle = '#ffffff'
  } else {
      context.fillStyle = '#ffffff'
  context.strokeStyle = '#000000'
  }
  
  
  

  context.lineWidth = 80
  context.lineCap = 'round'
  context.lineJoin = 'round'

  context.shadowBlur = 10
  context.shadowColor = context.strokeStyle
  context.rect(0, 0, w, h)
  context.fill()
}
// lets start to draw
const startDraw = function(canvas, x, y) {
  const context = canvas.getContext('2d')

  //   const colors = ["red", "yellow", "blue", "green"]
  //   const randomNum = Math.floor(Math.random() * colors.length)
  //   context.strokeStyle = colors[randomNum]

  context.moveTo(x, y)

  context.beginPath()
}

// draw based on: canvas, x, y
const moveDraw = function(canvas, x, y) {
  const context = canvas.getContext('2d')
  if (isMouseDown) {
    context.lineTo(x, y)
    context.stroke()
  }
}

setupCanvas(canvasIn)
setupCanvas(canvasOut)

document.addEventListener('mousedown', function(event) {
  isMouseDown = true
  growCursor()
  startDraw(canvasIn, event.pageX, event.pageY)
  startDraw(canvasOut, event.pageX, event.pageY)
})

document.addEventListener('mouseup', function() {
  isMouseDown = false
  shrinkCursor()
})

document.addEventListener('mousemove', function(event) {
  console.log(event)
  moveCursor(event.pageX, event.pageY)
  moveDraw(canvasIn, event.pageX, event.pageY)
  moveDraw(canvasOut, event.pageX, event.pageY)
})

window.addEventListener("resize", function () {
  setupCanvas(canvasIn)
  setupCanvas(canvasOut)
})