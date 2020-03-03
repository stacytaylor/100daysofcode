const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setClearColor(0x000000, 1)
  
  const sectionTag = document.querySelector('section')
  sectionTag.appendChild(renderer.domElement)
  
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000, 0.1, 7000)
  
  // add light
  const ambientLight = new THREE.AmbientLight(0x777777)
  scene.add(ambientLight)
  
  const pointLight = new THREE.PointLight(0xffffff, 1, 0)
  pointLight.position.set(500, 500, -2000)
  scene.add(pointLight)
  
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
  camera.position.z = -3000
  
  // make loader
  const loader = new THREE.TextureLoader()
  
  // make planet
  
  const makePlanet = function() {
    const texture = loader.load('images/jupiter.jpg')
    const geometry = new THREE.SphereGeometry(800, 128, 128)
    const material = new THREE.MeshLambertMaterial({
      //     color: 0x2727e6,
      map: texture
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    return mesh
  }
  
  // make ring
  const makeRing = function(width, color) {
    const geometry = new THREE.TorusGeometry(width, 5, 16, 100)
    const material = new THREE.MeshBasicMaterial({
      color: color
    })
    const mesh = new THREE.Mesh(geometry, material)
  
    mesh.geometry.rotateX(Math.PI / 2)
    mesh.geometry.rotateZ(Math.PI / 10)
  
    scene.add(mesh)
    return mesh
  }
  
  const makeStars = function() {
    const texture = loader.load("images/particle.png")
    const geometry = new THREE.Geometry()
  
    for (let i = 0; i < 5000; i++) {
      const point = new THREE.Vector3()
      const sphericalPoint = new THREE.Spherical(
        900 + Math.random() * 900,
        2 * Math.PI * Math.random(),
        Math.PI * Math.random()
      )
  
      point.setFromSpherical(sphericalPoint)
  
      geometry.vertices.push(point)
    }
  
    const material = new THREE.PointsMaterial({
      size: 50, 
      map: texture, 
      transparency: true, 
      blending: THREE.AdditiveBlending, 
      depthTest: true,
      depthWrite: false
    })
  
    const points = new THREE.Points(geometry, material)
  
    scene.add(points)
  
    return points
  }
  
  // make moon
  // const makeMoon = function () {
  //   const texture = loader.load("wilson-skin.png")
  //   const geometry = new THREE.SphereGeometry(100, 64, 64)
  //   const material = new THREE.MeshLambertMaterial({
  //     map: texture
  //   })
  //   const mesh = new THREE.Mesh(geometry, material)
  
  //   scene.add(mesh)
  //   return mesh
  // }
  
  const earth = makePlanet()
  const ring1 = makeRing(1100, 0xff1414)
  const ring2 = makeRing(1200, 0xffffff)
  const ring3 = makeRing(1300, 0xffbd00)
  const stars = makeStars()
  
  // const moon = makeMoon()
  // const moonGroup = new THREE.Group()
  // moonGroup.add(moon)
  // scene.add(moonGroup)
  // moon.translateX(-1500)
  
  let currentX = 0
  let currentY = 0
  let aimX = 0
  let aimY = 0
  
  const animate = function() {
    const diffX = aimX - currentX
    const diffY = (aimY = currentY)
  
    currentX = currentX + diffX * 0.05
    currentY = currentY + diffY * 0.05
  
    camera.position.x = currentX
    camera.position.y = currentY
  
    camera.lookAt(scene.position)
    earth.rotateY(0.02)
    //   moon.rotateY(0.03)
    //   moonGroup.rotateY(0.03)
  
    ring1.geometry.rotateY(0.007)
    ring2.geometry.rotateY(-0.008)
    ring3.geometry.rotateY(-0.01)
  
    renderer.render(scene, camera)
  
    requestAnimationFrame(animate)
  }
  
  animate()
  
  window.addEventListener('resize', function() {
    camera.aspect - window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
  
  // document.addEventListener("scroll", function () {
  //   const scrollPosition = window.pageYOffset
  
  //   earth.rotation.set(0, scrollPosition / 100, 0)
  // })
  
  document.addEventListener('mousemove', function(event) {
    aimX = (window.innerWidth / 2 - event.pageX) * 4
    aimY = (window.innerHeight / 2 - event.pageY) * 4
  })
  
  document.addEventListener('touchmove', function(event) {
    aimX = (window.innerWidth / 2 - event.pageX) * 4
    aimY = (window.innerHeight / 2 - event.pageY) * 4
  })
  