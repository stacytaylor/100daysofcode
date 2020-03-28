// pick all images and layer based on z-index

const slideArea = document.querySelector('div.slides')
const images = slideArea.querySelectorAll('img')

// keep track of which slide and z index

let currentSlide = 0
let z = 1

// change slide when clicking

slideArea.addEventListener('click', function() {
  currentSlide++
  
  if (currentSlide > images.length - 1) {
    currentSlide = 0
  }
  z++
  
//   remove animation from style for every images
  
  images.forEach(image => {
    image.style.animation = ""
  })

  images[currentSlide].style.zIndex = z
  images[currentSlide].style.animation = "fade 0.5s"
})

// move images randomly when hover
slideArea.addEventListener("mouseover", function () {
  images.forEach(image => {
    const x = 25 * (Math.floor(Math.random() * 5)) - 50
    const y =  25 * (Math.floor(Math.random() * 5)) - 50
    
    image.style.transform = `translate(${x}px, ${y}px`
  })
})

slideArea.addEventListener("mouseout", function () {
  images.forEach(image => {
    image.style.transform = ""
  })
})
