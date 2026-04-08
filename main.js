// ===========================
// SCENE
// ===========================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xd9e7f7);

// ===========================
// CAMERA
// ===========================
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

let cameraAngle = 0;
let cameraRadius = 24;

camera.position.set(24, 10, 0);
camera.lookAt(0, 3, 0);

// ===========================
// RENDERER
// ===========================
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ===========================
// TEXTURE LOADER
// ===========================
const loader = new THREE.TextureLoader();

const roadTexture = loader.load("textures/road.jpg");
const carTexture1 = loader.load("textures/car1.jpg");
const carTexture2 = loader.load("textures/car2.jpg");
const tireTexture = loader.load("textures/tire.jpg");
const rimTexture = loader.load("textures/rim.jpg");

roadTexture.wrapS = THREE.RepeatWrapping;
roadTexture.wrapT = THREE.RepeatWrapping;
roadTexture.repeat.set(2, 8);

tireTexture.wrapS = THREE.RepeatWrapping;
tireTexture.wrapT = THREE.RepeatWrapping;
tireTexture.repeat.set(2, 1);

rimTexture.wrapS = THREE.RepeatWrapping;
rimTexture.wrapT = THREE.RepeatWrapping;

// ===========================
// ROAD
// ===========================
const road = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 60),
  new THREE.MeshPhongMaterial({ map: roadTexture })
);
road.rotation.x = -Math.PI / 2;
road.receiveShadow = true;
scene.add(road);

// ===========================
// GRASS
// ===========================
const grassMaterial = new THREE.MeshPhongMaterial({ color: 0x3f7f2a });

const leftGrass = new THREE.Mesh(
  new THREE.PlaneGeometry(28, 60),
  grassMaterial
);
leftGrass.rotation.x = -Math.PI / 2;
leftGrass.position.set(-22, -0.02, 0);
leftGrass.receiveShadow = true;
scene.add(leftGrass);

const rightGrass = new THREE.Mesh(
  new THREE.PlaneGeometry(28, 60),
  grassMaterial
);
rightGrass.rotation.x = -Math.PI / 2;
rightGrass.position.set(22, -0.02, 0);
rightGrass.receiveShadow = true;
scene.add(rightGrass);

// ===========================
// LANE MARKINGS
// ===========================
const laneMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

for (let i = -25; i <= 25; i += 6) {
  const lane = new THREE.Mesh(
    new THREE.PlaneGeometry(0.4, 2.8),
    laneMaterial
  );
  lane.rotation.x = -Math.PI / 2;
  lane.position.set(0, 0.01, i);
  lane.receiveShadow = true;
  scene.add(lane);
}

// ===========================
// CAR GROUP
// ===========================
const carGroup = new THREE.Group();
scene.add(carGroup);

// Align car with road direction
carGroup.rotation.y = Math.PI / 2;

// ===========================
// MATERIALS
// ===========================
const carMaterial = new THREE.MeshPhongMaterial({
  map: carTexture1,
  shininess: 60
});

const glassMaterial = new THREE.MeshPhongMaterial({
  color: 0x88ccee,
  transparent: true,
  opacity: 0.65,
  shininess: 120
});

const frameMaterial = new THREE.MeshPhongMaterial({
  color: 0x1f1f1f,
  shininess: 60
});

const bumperMaterial = new THREE.MeshPhongMaterial({
  color: 0x2a2a2a,
  shininess: 80
});

const mirrorMaterial = new THREE.MeshPhongMaterial({
  color: 0x222222,
  shininess: 80
});

const grilleMaterial = new THREE.MeshPhongMaterial({
  color: 0x111111,
  shininess: 120
});

const grilleLineMaterial = new THREE.MeshPhongMaterial({
  color: 0x666666,
  shininess: 140
});

const plateMaterial = new THREE.MeshPhongMaterial({
  color: 0xf5f5f5,
  shininess: 30
});

// ===========================
// BIGGER CAR BODY
// ===========================
const body = new THREE.Mesh(
  new THREE.BoxGeometry(8.4, 1.9, 4.0),
  carMaterial
);
body.position.set(0, 2.3, 0);
body.castShadow = true;
body.receiveShadow = true;
carGroup.add(body);

// ===========================
// RESHAPED HOOD
// ===========================
const hoodBase = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 1.0, 3.5),
  carMaterial
);
hoodBase.position.set(3.25, 2.9, 0);
hoodBase.castShadow = true;
hoodBase.receiveShadow = true;
carGroup.add(hoodBase);

const hoodTop = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 0.4, 3.1),
  carMaterial
);
hoodTop.position.set(3.8, 3.45, 0);
hoodTop.rotation.z = -0.1;
hoodTop.castShadow = true;
hoodTop.receiveShadow = true;
carGroup.add(hoodTop);

// ===========================
// CABIN
// ===========================
const cabin = new THREE.Mesh(
  new THREE.BoxGeometry(3.8, 1.8, 3.2),
  carMaterial
);
cabin.position.set(-0.2, 3.9, 0);
cabin.castShadow = true;
cabin.receiveShadow = true;
carGroup.add(cabin);

// ===========================
// SIDE WINDOWS
// ===========================
const leftWindow = new THREE.Mesh(
  new THREE.BoxGeometry(3.0, 1.0, 0.1),
  glassMaterial
);
leftWindow.position.set(-0.2, 3.95, 1.62);
carGroup.add(leftWindow);

const rightWindow = new THREE.Mesh(
  new THREE.BoxGeometry(3.0, 1.0, 0.1),
  glassMaterial
);
rightWindow.position.set(-0.2, 3.95, -1.62);
carGroup.add(rightWindow);

// ===========================
// FRONT WINDSHIELD
// ===========================
const windshield = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 1.35, 2.8),
  glassMaterial
);
windshield.position.set(2.3, 3.6, 0);
windshield.rotation.z = -0.45;
carGroup.add(windshield);

// ===========================
// REAR WINDSHIELD
// ===========================
const rearWindshield = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 1.2, 2.7),
  glassMaterial
);
rearWindshield.position.set(-2.15, 3.55, 0);
rearWindshield.rotation.z = 0.45;
carGroup.add(rearWindshield);

// ===========================
// WINDSHIELD FRAME
// ===========================
function addFrame(width, height, depth, x, y, z, rotZ = 0) {
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    frameMaterial
  );
  frame.position.set(x, y, z);
  frame.rotation.z = rotZ;
  carGroup.add(frame);
}

addFrame(0.16, 1.42, 0.08, 2.3, 3.6, 1.42, -0.45);
addFrame(0.16, 1.42, 0.08, 2.3, 3.6, -1.42, -0.45);
addFrame(0.16, 0.08, 2.95, 2.3, 4.25, 0, -0.45);
addFrame(0.16, 0.08, 2.95, 2.3, 2.95, 0, -0.45);

addFrame(0.16, 1.25, 0.08, -2.15, 3.55, 1.36, 0.45);
addFrame(0.16, 1.25, 0.08, -2.15, 3.55, -1.36, 0.45);
addFrame(0.16, 0.08, 2.8, -2.15, 4.15, 0, 0.45);
addFrame(0.16, 0.08, 2.8, -2.15, 2.95, 0, 0.45);

// ===========================
// FRONT BUMPER
// ===========================
const frontBumper = new THREE.Mesh(
  new THREE.BoxGeometry(0.45, 0.55, 3.8),
  bumperMaterial
);
frontBumper.position.set(4.45, 1.7, 0);
frontBumper.castShadow = true;
frontBumper.receiveShadow = true;
carGroup.add(frontBumper);

// ===========================
// REAR BUMPER
// ===========================
const rearBumper = new THREE.Mesh(
  new THREE.BoxGeometry(0.45, 0.55, 3.8),
  bumperMaterial
);
rearBumper.position.set(-4.45, 1.7, 0);
rearBumper.castShadow = true;
rearBumper.receiveShadow = true;
carGroup.add(rearBumper);

// ===========================
// BIG VISIBLE FRONT GRILLE
// ===========================
const grille = new THREE.Mesh(
  new THREE.BoxGeometry(0.14, 1.1, 2.2),
  grilleMaterial
);
grille.position.set(4.38, 2.15, 0);
carGroup.add(grille);

for (let i = -0.4; i <= 0.4; i += 0.2) {
  const slat = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.06, 2.0),
    grilleLineMaterial
  );
  slat.position.set(4.45, 2.15 + i, 0);
  carGroup.add(slat);
}

for (let i = -0.7; i <= 0.7; i += 0.35) {
  const vslat = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.85, 0.05),
    grilleLineMaterial
  );
  vslat.position.set(4.46, 2.15, i);
  carGroup.add(vslat);
}

// ===========================
// LICENSE PLATES
// ===========================
const frontPlate = new THREE.Mesh(
  new THREE.BoxGeometry(0.08, 0.38, 1.2),
  plateMaterial
);
frontPlate.position.set(4.58, 1.45, 0);
carGroup.add(frontPlate);

const rearPlate = new THREE.Mesh(
  new THREE.BoxGeometry(0.08, 0.38, 1.2),
  plateMaterial
);
rearPlate.position.set(-4.58, 1.45, 0);
carGroup.add(rearPlate);

function addPlateBars(x) {
  for (let i = -0.14; i <= 0.14; i += 0.14) {
    const bar = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.035, 0.8),
      new THREE.MeshPhongMaterial({ color: 0x222222 })
    );
    bar.position.set(x, 1.45 + i, 0);
    carGroup.add(bar);
  }
}
addPlateBars(4.63);
addPlateBars(-4.63);

// ===========================
// SIDE MIRRORS
// ===========================
function createMirror(x, y, z, direction) {
  const mirrorGroup = new THREE.Group();

  const arm = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.1, 0.1),
    mirrorMaterial
  );
  mirrorGroup.add(arm);

  const mirrorHead = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.28, 0.36),
    mirrorMaterial
  );
  mirrorHead.position.set(0.2, 0, 0);
  mirrorGroup.add(mirrorHead);

  mirrorGroup.position.set(x, y, z);
  mirrorGroup.rotation.y = direction;
  carGroup.add(mirrorGroup);
}

createMirror(1.35, 3.55, 1.85, 0);
createMirror(1.35, 3.55, -1.85, Math.PI);

// ===========================
// HEADLIGHTS
// ===========================
let headlightsOn = true;

const headlightMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffcc,
  emissive: 0xffffaa,
  emissiveIntensity: 0.9
});

const headlight1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 20, 20),
  headlightMaterial
);
headlight1.position.set(4.25, 2.0, 1.15);
carGroup.add(headlight1);

const headlight2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.24, 20, 20),
  headlightMaterial
);
headlight2.position.set(4.25, 2.0, -1.15);
carGroup.add(headlight2);

// headlight beams
const headBeam1 = new THREE.SpotLight(0xfff4cc, 2.2, 35, 0.45, 0.5, 1);
headBeam1.position.set(4.25, 2.0, 1.15);
headBeam1.target.position.set(11, 1.5, 1.15);
scene.add(headBeam1);
scene.add(headBeam1.target);

const headBeam2 = new THREE.SpotLight(0xfff4cc, 2.2, 35, 0.45, 0.5, 1);
headBeam2.position.set(4.25, 2.0, -1.15);
headBeam2.target.position.set(11, 1.5, -1.15);
scene.add(headBeam2);
scene.add(headBeam2.target);

// ===========================
// TAIL LIGHTS
// ===========================
const tailMaterial = new THREE.MeshPhongMaterial({
  color: 0xff3333,
  emissive: 0xaa0000,
  emissiveIntensity: 0.5
});

const tail1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 20, 20),
  tailMaterial
);
tail1.position.set(-4.2, 2.0, 1.15);
carGroup.add(tail1);

const tail2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 20, 20),
  tailMaterial
);
tail2.position.set(-4.2, 2.0, -1.15);
carGroup.add(tail2);

// ===========================
// WHEELS
// ===========================
function createWheel(x, z) {
  const wheelGroup = new THREE.Group();

  const tireMaterial = new THREE.MeshPhongMaterial({
    map: tireTexture,
    color: 0x222222
  });

  const rimMaterial = new THREE.MeshPhongMaterial({
    map: rimTexture,
    color: 0xd0d0d0,
    shininess: 120
  });

  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(1.0, 1.0, 0.95, 36),
    tireMaterial
  );
  tire.rotation.x = Math.PI / 2;
  tire.castShadow = true;
  tire.receiveShadow = true;
  wheelGroup.add(tire);

  const outerRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.58, 0.58, 0.14, 24),
    rimMaterial
  );
  outerRim.rotation.x = Math.PI / 2;
  outerRim.position.z = 0.42;
  wheelGroup.add(outerRim);

  const innerRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.58, 0.58, 0.14, 24),
    rimMaterial
  );
  innerRim.rotation.x = Math.PI / 2;
  innerRim.position.z = -0.42;
  wheelGroup.add(innerRim);

  const cap1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.05, 20),
    new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 150 })
  );
  cap1.rotation.x = Math.PI / 2;
  cap1.position.z = 0.5;
  wheelGroup.add(cap1);

  const cap2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.05, 20),
    new THREE.MeshPhongMaterial({ color: 0xf0f0f0, shininess: 150 })
  );
  cap2.rotation.x = Math.PI / 2;
  cap2.position.z = -0.5;
  wheelGroup.add(cap2);

  wheelGroup.position.set(x, 1.05, z);
  carGroup.add(wheelGroup);

  return wheelGroup;
}

const wheelFL = createWheel(2.7, 2.2);
const wheelFR = createWheel(2.7, -2.2);
const wheelBL = createWheel(-2.7, 2.2);
const wheelBR = createWheel(-2.7, -2.2);

// ===========================
// LIGHTING
// ===========================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(16, 22, 12);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.left = -35;
directionalLight.shadow.camera.right = 35;
directionalLight.shadow.camera.top = 35;
directionalLight.shadow.camera.bottom = -35;
scene.add(directionalLight);

// rotating light around the car
const movingLight = new THREE.PointLight(0xffeeaa, 1.6, 100);
movingLight.position.set(10, 8, 0);
movingLight.castShadow = true;
movingLight.shadow.mapSize.width = 2048;
movingLight.shadow.mapSize.height = 2048;
movingLight.shadow.bias = -0.0005;
movingLight.shadow.radius = 4;
scene.add(movingLight);

// visible marker for rotating light
const movingLightMarker = new THREE.Mesh(
  new THREE.SphereGeometry(0.25, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xffdd88 })
);
scene.add(movingLightMarker);

// ===========================
// SKY SHADER
// ===========================
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(100, 32, 32),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vPosition;
      void main() {
        float h = normalize(vPosition).y;
        vec3 topColor = vec3(0.45, 0.67, 0.95);
        vec3 bottomColor = vec3(0.97, 0.98, 1.0);
        vec3 finalColor = mix(bottomColor, topColor, max(h, 0.0));
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  })
);
scene.add(sky);

// ===========================
// RAYCASTER / MOUSE
// ===========================
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let usingTexture1 = true;

window.addEventListener("click", function (event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // Click headlights to toggle them
  const headlightHits = raycaster.intersectObjects([headlight1, headlight2]);

  if (headlightHits.length > 0) {
    headlightsOn = !headlightsOn;

    if (headlightsOn) {
      headlightMaterial.emissiveIntensity = 0.9;
      headBeam1.intensity = 2.2;
      headBeam2.intensity = 2.2;
    } else {
      headlightMaterial.emissiveIntensity = 0.0;
      headBeam1.intensity = 0.0;
      headBeam2.intensity = 0.0;
    }

    headlight1.material.needsUpdate = true;
    headlight2.material.needsUpdate = true;
    return;
  }

  // Click body to change texture
  const carHits = raycaster.intersectObjects([body, hoodBase, hoodTop, cabin]);

  if (carHits.length > 0) {
    if (usingTexture1) {
      body.material.map = carTexture2;
      hoodBase.material.map = carTexture2;
      hoodTop.material.map = carTexture2;
      cabin.material.map = carTexture2;
      usingTexture1 = false;
    } else {
      body.material.map = carTexture1;
      hoodBase.material.map = carTexture1;
      hoodTop.material.map = carTexture1;
      cabin.material.map = carTexture1;
      usingTexture1 = true;
    }

    body.material.needsUpdate = true;
    hoodBase.material.needsUpdate = true;
    hoodTop.material.needsUpdate = true;
    cabin.material.needsUpdate = true;
  }
});

// ===========================
// KEYBOARD INTERACTION
// ===========================
window.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    cameraAngle -= 0.1;
  }

  if (e.key === "ArrowRight") {
    cameraAngle += 0.1;
  }

  if (e.key === "ArrowUp") {
    cameraRadius -= 0.8;
    if (cameraRadius < 12) cameraRadius = 12;
  }

  if (e.key === "ArrowDown") {
    cameraRadius += 0.8;
    if (cameraRadius > 40) cameraRadius = 40;
  }
});

// ===========================
// ANIMATION
// ===========================
let lightAngle = 0;

function animate() {
  requestAnimationFrame(animate);

  // camera orbit around car
  camera.position.x = cameraRadius * Math.cos(cameraAngle);
  camera.position.z = cameraRadius * Math.sin(cameraAngle);
  camera.position.y = 10;
  camera.lookAt(0, 3.0, 0);

  // wheels rotate
  wheelFL.rotation.z -= 0.08;
  wheelFR.rotation.z -= 0.08;
  wheelBL.rotation.z -= 0.08;
  wheelBR.rotation.z -= 0.08;

  // rotating light around car with moving shadow
  lightAngle += 0.02;
  movingLight.position.x = 10 * Math.cos(lightAngle);
  movingLight.position.z = 10 * Math.sin(lightAngle);
  movingLight.position.y = 8;

  movingLightMarker.position.copy(movingLight.position);

  // headlight beam positions
  const leftHeadWorld = new THREE.Vector3();
  const rightHeadWorld = new THREE.Vector3();

  headlight1.getWorldPosition(leftHeadWorld);
  headlight2.getWorldPosition(rightHeadWorld);

  headBeam1.position.copy(leftHeadWorld);
  headBeam2.position.copy(rightHeadWorld);

  headBeam1.target.position.set(leftHeadWorld.x, leftHeadWorld.y - 0.2, leftHeadWorld.z + 8);
  headBeam2.target.position.set(rightHeadWorld.x, rightHeadWorld.y - 0.2, rightHeadWorld.z + 8);

  renderer.render(scene, camera);
}

animate();

// ===========================
// RESIZE FIX
// ===========================
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});