const sentenceTag = document.querySelector(`input[type = "text"]`)
const outputTag = document.querySelector("textarea.output") 

const originalText = outputTag.value

const typesizeTag = document.querySelector(`input[name="typesize"]`)
const typesizeOutput = document.querySelector("span.typesize-output")

const fontweightTag = document.querySelector(`input[name="fontweight"]`)
const fontweightOutput = document.querySelector("span.fontweight-output")

const lineheightTag = document.querySelector(`input[name="lineheight"]`)
const lineheightOutput = document.querySelector("span.lineheight-output")

const italicTag = document.querySelector(`input[name="italic"]`)

const typefaceTag = document.querySelector(`select[name="typeface"]`)

const colorTags = document.querySelectorAll("div.colors div")

// when i type in sentence tag update output tag

sentenceTag.addEventListener("keyup", function () {
  if (this.value) {
  outputTag.value = this.value
    } else {
      outputTag.innerHTML = originalText
    }
})

outputTag.addEventListener("keyup", function () {
  if (this.value) {
  sentenceTag.value = this.value
    } else {
      sentenceTag.innerHTML = originalText
    }
})

// when i change type slider update text

// change output tag outside
typesizeTag.addEventListener("input", function () {
  outputTag.style.fontSize = this.value + "px"
  typesizeOutput.innerHTML = this.value +  "px"
})

fontweightTag.addEventListener("input", function () {
  outputTag.style.fontWeight = this.value
  fontweightOutput.innerHTML = this.value
})

lineheightTag.addEventListener("input", function () {
  outputTag.style.lineHeight = this.value
  lineheightOutput.innerHTML = this.value
})


italicTag.addEventListener("change", function () {
  if (this.checked)  {
    outputTag.style.fontStyle = "italic"
  } else {
     outputTag.style.fontStyle = "normal"
  }
})


typefaceTag.addEventListener("input", function () {
  outputTag.style.fontFamily = this.value
   
})


// go through color tags then change background colro and text color

colorTags.forEach(tag => {
  tag.addEventListener("click", function () {
    outputTag.style.backgroundColor = this.style.backgroundColor
    outputTag.style.color = this.style.color

//     reset the classes
    colorTags.forEach(tag => {
      tag.classList.remove("selected")
    })
  this.classList.add("selected")
  
  })
})