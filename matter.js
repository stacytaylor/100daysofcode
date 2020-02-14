// two things matter needs
// engine - math behind it
// renderer - draws the engine

//alias is shortcut to make code run cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render

const {Engine, Render, Bodies, World, MouseConstraint, Composites, Query} = Matter

//where is matter deployed
const sectionTag = document.querySelector("section.shapes")

//height and width of the page
const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()
const renderer = Render.create({
  element: sectionTag,
	engine: engine, 
	options: {
    height: h,
    width: w, 
    background: "#000000",
    wireframes: false,
    pixelRatio: window.devicePixelRatio
  }
})


// create a shape on the page
const createShape = function (x, y) {
  return Bodies.rectangle(x, y, 38, 50,
                       {
    render: {
      sprite: {
        texture: "outline-2x.png", 
        xScale: 0.5,
        yScale: 0.5
      }
    }
  }
                      )
}


const bigBall = Bodies.circle(w /2, h / 2, 250, {
  isStatic: true, 
  render: {
    fillStyle: "#ffffff"
  }
})

const wallOptions = {
  isStatic: true, 
  render: {
    visible: false
  }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
const ceiling = Bodies.rectangle(w/2, - 50, w + 100, 100, wallOptions)
const leftWall = Bodies.rectangle(-50, h/2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w+50, h/2, 100, h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
  element: sectionTag,
	constraint: {
    render: {
      visible: false
    }
  }
})

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return createShape(x, y)
})


World.add(engine.world, [
  bigBall, 
  ground, 
  ceiling, 
  leftWall, 
  rightWall, 
  mouseControl, 
  initialShapes
])


//add new shape on click
document.addEventListener("click", function (event) {
  const shape = createShape(event.pageX, event.pageY)
//   initialShapes.bodies.push(shape)
  World.add(engine.world, shape)
})

// check matter for collisions
// document.addEventListener("mousemove", function (event) {
// 	const vector = { x: event.pageX, y: event.pageY }
//   const hoverShapes = Query.point(initialShapes.bodies, vector)
  
//   hoverShapes.forEach(shape => {
//     shape.render.sprite = null
//     shape.render.fillStyle = "red"
//   })
  
  
// })

// run engine and renderer
Matter.Engine.run(engine)
Matter.Render.run(renderer)


let time = 0

const changeGravity = function () {
	time = time + 0.01  
 
 engine.world.gravity.x = Math.sin(time)
  engine.world.gravity.y = Math.cos(time)
  
  requestAnimationFrame(changeGravity)
}

changeGravity()


