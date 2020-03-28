const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const resultsTag = document.querySelector('section.results')

const accessKey = 'WEs2HUBJAxZG44DYr78HEMGQjtPQ55VSmWsK7Ay36zM'
const apiUrl = 'https://api.unsplash.com/search/photos?per_page=24&query='

const searchUnsplash = function(term) {
  return fetch(apiUrl + term, {
    method: 'GET',
    headers: {
      Authorization: 'Client-ID ' + accessKey
    }
  })
    .then(response => response.json())
    .then(data => {
      //     console.log(data)
      // format data

      return data.results.map(result => {
        return {
          imageSrc: result.urls.regular,
          width: result.width,
          height: result.height,
          name: result.user.name,
          title: result.description || 'Untitled',
          backgroundColor: (result.color || '#cccccc') + "33"
        }
      })
    })
}

// add results to page

const addResults = function(results) {
  //   remove all loading tags
  resultsTag.innerHTML = ''

  //   loop over reuslts and add to results
  results.forEach(result => {
    resultsTag.innerHTML =
      resultsTag.innerHTML +
      `
		<div class = "single-result">
			<div class ="image" style="background-color: ${result.backgroundColor}"
			<div class ="image">
			<img src="${result.imageSrc}">
			</div>
			<h2>${result.title}</h2>
			<p>by ${result.name} - ${result.width} x ${result.height}</p>
		</div>
		`
  })
}

// when we submit get info

formTag.addEventListener('submit', function(event) {
  //   get info from input
  const searchTerm = inputTag.value

  searchUnsplash(searchTerm).then(results => {
    addResults(results)
  })

  //   stop form going to next page
  event.preventDefault()
})
