const quoteTag = document.querySelector('h1')
const authorTag = document.querySelector('p')
const bodyTag = document.querySelector("body")
const randomTag = document.querySelector('footer img')

// let data = []

// // let's load in data
// fetch('https://api.superhi.com/api/test/quotes/')
//   .then(response => response.json())
//   .then(jsonData => {
//     data = jsonData
//     getQuote()
//   })

const getQuote = function() {
//   if (data.length > 0) {
    //   get random quote
//     const randomNumber = Math.floor(Math.random() * data.length)
//     const randomQuote = data[randomNumber]

//     quoteTag.innerHTML = randomQuote.quote
//     authorTag.innerHTML = randomQuote.author
//   }

fetch("https://api.superhi.com/api/test/quotes/random")
  .then(response => response.json())
  .then(jsonData => {
  	quoteTag.innerHTML = "&ldquo;" + jsonData.quote + "&rdquo;"
  	authorTag.innerHTML = "- " + jsonData.author
  
  
  if (jsonData.quote.length > 100) {
    quoteTag.classList.add("long")
  } else {
    quoteTag.classList.remove("long")
  }
 
  bodyTag.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 90%)`
})
}

// run get quote on page load

getQuote()

// run on click of random image
randomTag.addEventListener('click', function() {
  getQuote()
})
