// set up renderer

const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  
  renderer.setClearColor(0x333333, 1)
  
  const section = document.querySelector('section')
  section.appendChild(renderer.domElement)
  
  const scene = new THREE.Scene()
  
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
  camera.position.z = -50
  camera.lookAt(scene.position)
  // lets add light
  
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 0, -1)
  scene.add(light)
  
  // hold data about shapes being added
  const shapes = []
  
  // add animation loop
  
  const animate = function () {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    
    camera.position.setZ(camera.position.z + 4)
    
  //   rotate shapes each frame
    shapes.forEach(shape => {
      shape.rotateX(0.05)
  //     shape.position.setZ(shape.position.z - 5)
    })
  }
  
  // start animation
  animate()
  
  // hold hue
  let hue = 0
  
  // make shape
  
  const createShape = function(x, y) {
    
    const geometries = [
      new THREE.ConeGeometry(10, 20, 32),
      new THREE.BoxGeometry(15, 15, 15),
      new THREE.TorusGeometry(5, 3, 16, 100)
    ]
    
    const randNumber = Math.floor(Math.random() * geometries.length)
    const geometry = geometries[randNumber]
    
    const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
    const material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: emissiveColor
    })
  
    const shape = new THREE.Mesh(geometry, material)
      
    shape.position.set((window.innerWidth / 2) - x, 
                       (window.innerHeight /2) - y, 
                       camera.position.z + 500
                      )
    shape.rotateX(0.5)
    shape.rotateZ(0.5)
    
      shapes.push(shape)
    scene.add(shape)
    
    hue = hue + 1
  }
  
  //on draw
  
  let isMouseDown = false
  
  document.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
    createShape(event.pageX, event.pageY)            
      }
  })
  
  document.addEventListener("mousedown", function () {
    isMouseDown = true
  })
  
  document.addEventListener("mouseup", function () {
    isMouseDown = false
  })
  
  document.addEventListener("touchmove", function (event) {
    if (isMouseDown) {
    createShape(event.pageX, event.pageY)            
      }
  })
  
  document.addEventListener("touchstart", function () {
    isMouseDown = true
  })
  
  document.addEventListener("touchend", function () {
    isMouseDown = false
  })
  
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })