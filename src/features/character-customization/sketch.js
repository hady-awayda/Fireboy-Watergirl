let saveButton;

function setup() {
  createCanvas(800, 600);
  stroke(0);
  strokeWeight(2);

  saveButton = createButton('Make Your Character');
  saveButton.position(350, 10);
  saveButton.mousePressed(saveCharacter);
}

function draw() {
  stroke(1);
  strokeWeight(1);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function saveCharacter() {
  saveCanvas('character', 'png');
}
