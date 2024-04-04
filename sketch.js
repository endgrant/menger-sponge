const masterSize = 60;
let masterBox;

const maxSubdivisions = 3;
let subdivisionCount = 0;
let boxCount = 1;


// Called when the program starts
function setup() {
  createCanvas(400, 400, WEBGL);
  camera(0, 0, 240);
  reset();
}


// Draws every frame
function draw() {
  background(0);
  strokeWeight(0.1);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  
  masterBox.process();
  
  document.getElementById("fps").innerText =
    "FPS: " + str(round(frameRate()));
}


// User left-clicked mouse
function mouseClicked() {
  subdivisionCount++;
  if (subdivisionCount > maxSubdivisions) {
    reset();
    return;
  }
  
  boxCount *= 20;
  masterBox.subdivide();
  updateHTML();
}


// Resets the sponge to 0 subdivisions
function reset() {
  subdivisionCount = 0;
  boxCount = 1;
  masterBox = new Box(masterSize, createVector(0, 0, 0));
  updateHTML();
}


// Updates the HTML elements
function updateHTML() {
  document.getElementById("maxSubdivisions").innerText =
    "Maximum Permitted Subdivisions: " + str(maxSubdivisions);
  document.getElementById("subdivisionCount").innerText =
    "Subdivisions: " + str(subdivisionCount);
  document.getElementById("boxCount").innerText =
    "Cubes: " + str(boxCount);
}