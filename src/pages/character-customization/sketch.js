let saveButton;

function setup() {
  createCanvas(800, 600);
  stroke(0);
  strokeWeight(2);

  saveButton = createButton("Make Your Character");
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
  const name = document.getElementById("character-name").value;

  if (!name) {
    alert("Please enter a character name.");
    return;
  }

  saveCanvas(`${name}`, "png");

  let canvasImage = canvas.toDataURL("image/png");

  const characters = JSON.parse(localStorage.getItem("characters"));

  characters.createdCharacters.push({ name: name, image: canvasImage });

  localStorage.setItem("characters", JSON.stringify(characters));
}
