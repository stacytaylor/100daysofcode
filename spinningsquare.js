// pick a tag to do code in
// let's set up two.js in this tag
const container = document.querySelector("section")

const params = { 
  width: 500, 
  height: 500 
}

const two = new Two(params)
two.appendTo(container)
//   var colors = [
//           'rgb(255, 64, 64)',
//           'rgb(255, 128, 0)',
//           'rgb(0, 200, 255)',
//           'rgb(0, 191, 168)',
//           'rgb(153, 102, 255)',
//           'rgb(255, 244, 95)'
//         ];

//         var linearGradient = two.makeLinearGradient(0, 100, 100, 100,
//             new Two.Stop(0, colors[0]),
//           new Two.Stop(1, colors[1]),
//           new Two.Stop(1, colors[2])
//         );

// add shape
const shape = two.makeRectangle(250, 250, 100, 100)
shape.fill = "#f9bc31"
shape.noStroke()
shape.rotation = Math.PI * 0.25

// let's listen for any update, any frame 60fps
two.bind("update", function (){
  shape.rotation -= 0.05
  
})

two.play()