const container = document.querySelector('section')

const params = {
  width: 500,
  height: 500
}

const two = new Two(params)
two.appendTo(container)

// config for our animation
const numberOfShapes = 40
const shapes = []
const loopDuration = 4 * 60
const aDelay = 0.0025
const shapeColor = ['#06B3EB', '#069ECC', '#055E78', '#04323D', '#030C0D']
const n = randomNumber(0, 3)

// make shapes
for (let i = 0; i < numberOfShapes; i++) {
  const size = 20
  const sx = 250
  const sy = 250
  const sr = 0
  const ss = 1
  const plotRadius = 325
  const angle = (fullRotation * i) / numberOfShapes

let ex = 0
  if (i < 5) {
     ex = 50
  } else if (i < 10) {
     ex = 150
  } else if (i < 15) {
     ex = 250
  } else if (i < 20) {
     ex = 350
  } else {
        ex = 450
      }
 
  let ey = 0
  if (i % 5 === 0) {
     ey = 50
  } else if (i % 5 === 1) {
     ey = 150
  } else if (i % 5 === 2) {
     ey = 250
  } else if (i % 5 === 3) {
     ey = 350
  } else {
        ey = 450
      }
  /*
   if (i < 5) {
    ex = 50
    ey = 50
   }
   */

  //    const ex = 400 + plotRadius * Math.cos(angle)
  //    const ey = 400 + plotRadius * Math.sin(angle)

  const mx = randomNumber(25, 450)
  const my = randomNumber(25, 450)
  const mr = randomNumber(-2 * fullRotation, 2 * fullRotation)
  const er = 0
  const ms = randomNumber(1, 4)
  const es = 4
  
  const shape = two.makeRectangle(sx, sy, 25, 25)
  shape.noStroke()
  shape.fill = shapeColor[i % 5]
  shape.data = {
    sx: sx,
    sy: sy,
    sr: sr,
    ss: ss,
    mx: mx,
    my: my,
    mr: mr,
    ms:ms,
    ex: ex,
    ey: ey,
    er: er,
    es: es
  }
  shapes.push(shape)
}

two.bind('update', function(frameCount) {
  // draw
  const currentFrame = frameCount % loopDuration
  const t = currentFrame / loopDuration

  shapes.forEach((shape, i) => {
    // if (currentFrame === 0) {
    //  shape.data.ex = randomNumber(50, 450)
    // shape.data.ey = randomNumber(50, 450)
    //shape.data.er = randomNumber(-2 * fullRotation, 2 * fullRotation)
    // }

    const aStart = aDelay * (numberOfShapes - i)
    const aEnd = aDelay * i

    let u = 0
    /*
    if (t < 0.5) {
      u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
    } else {
      u = mapAndClamp(t, 0.5 + aStart, 1 - aEnd, 1, 0)
    }
    
    const cu = easeInOutCubic(u)
    
    const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.mx)
    const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.my)
    const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.mr)
 //   const s = mapAndClamp(cu, 0, 1, shape.data.ss, shape.data.es)
*/

    if (t < 0.5) {
      //sequence one grow
      const u = mapAndClamp(t, aStart, 0.5 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      const x = mapAndClamp(cu, 0, 1, shape.data.sx, shape.data.ex)
      const y = mapAndClamp(cu, 0, 1, shape.data.sy, shape.data.ey)
      const r = mapAndClamp(cu, 0, 1, shape.data.sr, shape.data.er)
      const s = mapAndClamp(cu, 0, 1, shape.data.ss, shape.data.es)

      shape.translation.x = x
      shape.translation.y = y
      shape.rotation = r
      shape.scale = s
      
    } /*else if (t < 0.5) {
      // sequence two rotate
      const u = mapAndClamp(t, 0.25 + aStart, 0.5 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      const x = mapAndClamp(cu, 0, 1, shape.data.mx, shape.data.ex)
      const y = mapAndClamp(cu, 0, 1, shape.data.my, shape.data.ey)
      const r = mapAndClamp(cu, 0, 1, shape.data.mr, shape.data.er)
      const s = mapAndClamp(cu, 0, 1, shape.data.ms, shape.data.es)
      
      shape.translation.x = x
      shape.translation.y = y
      shape.rotation = r
      shape.scale = s
    } else if (t < 0.75) {
      //sequence three shrink
      const u = mapAndClamp(t, 0.5 + aStart, 0.75 - aEnd, 0, 1)
      const cu = easeInOutCubic(u)
      const x = mapAndClamp(cu, 0, 1, shape.data.ex, shape.data.mx)
      const y = mapAndClamp(cu, 0, 1, shape.data.ey, shape.data.my)
      const r = mapAndClamp(cu, 0, 1, shape.data.er, shape.data.mr)
    	const s = mapAndClamp(cu, 0, 1, shape.data.es, shape.data.ms)
            
      shape.translation.x = x
      shape.translation.y = y
      shape.rotation = r
      shape.scale = s*/

    else {
      // sequence four straighten
      const u = mapAndClamp(t, .75 + aStart, 1 - aEnd, 1, 0)
      const cu = easeInOutCubic(u)
      const x = mapAndClamp(cu, 0, 1, shape.data.ex, shape.data.sx)
      const y = mapAndClamp(cu, 0, 1, shape.data.ey, shape.data.sy)
      const r = mapAndClamp(cu, 0, 1, shape.data.er, shape.data.sr)
      const s = mapAndClamp(cu, 0, 1, shape.data.es, shape.data.ss)
            
      shape.translation.x = x
      shape.translation.y = y
      shape.rotation = r
      shape.scale = s
    }

     
  })
})

//let currentColor = 0
//const bgColors = ["#45d3c5", "#ffe8b4", "#f9d2cd", "#bcdffd"]
//const shapesColors = ["#004F73", "#f8bc30", "#f45745", "#5745d3"]

//document.addEventListener("click", function() {
//currentColor +=1
//   currentColor = currentColor % bgColors.length

//    const bodyTag = document.querySelector("body")
//    bodyTag.style.backgroundColor = bgColors[currentColor]

//    shapes.forEach((shape, i) => {
//    shape.fill = shapesColors[currentColor]
//   })

two.play()
