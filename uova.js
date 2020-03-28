const spaceID = 'ftn3506bo50k'
const environmentID = 'master'
const accessToken = 'CU3l14heszzfaNmFvzYm9Saa_hgwyiUb0jegMoTp-v8'

const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/${environmentID}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItem`

const sectionTag = document.querySelector('section.grid')

const grabData = function() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      //     store assests somewhere
      const assets = data.includes.Asset

      //     turn contenful data into something useful
      return data.items.map(item => {
        let imageUrl = 'images/uovaimage1.jpg'

        const imageId = item.fields.image.sys.id

        const imageData = assets.find(asset => {
          return asset.sys.id == imageId
        })

        if (imageData) {
          imageUrl = imageData.fields.file.url
        }

        item.fields.image = imageUrl
        return item.fields
      })
    })
}

// run graData function on load

grabData().then(data => {
  console.log(data)

  // remove loader

  sectionTag.innerHTML = ''

  data.forEach(item => {
    sectionTag.innerHTML =
      sectionTag.innerHTML +
      `
			<div class="item">
				<img src="${item.image}">

				<div class = "title">
					<h2>${item.title}</h2>
					<p>${item.price}</p>
			</div>
				<p>${item.description}</p>
			</div>
`
  })
})
