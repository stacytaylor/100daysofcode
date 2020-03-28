const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
const priceTag = document.querySelector("h1")
const spanTag = document.querySelector("span")
let currency = "USD"

const checkPrice = function () {
  fetch(url)
  	.then(response => response.json())
  	.then(data => {
//     	data.bpi or data["bpi"]
    	priceTag.innerHTML = data.bpi[currency].rate_float.toFixed(1)
  	})
}

checkPrice()


// loop over nav link and add click event

const navLinks = document.querySelectorAll("nav a")

navLinks.forEach(link => {
  link.addEventListener("click", function () {
    currency = this.getAttribute("data-currency")
    checkPrice()
    
//     rmove previous selected states
    navLinks.forEach(link => link.classList.remove("selected"))
    
    this.classList.add("selected")
    
//     update span tag
    spanTag.innerHTML = currency
    
  })
})

// check price every 60 seconds

setInterval(function () {
  checkPrice
}, 60000)