let saveButton;

function setup() {
  createCanvas(1200, 600);
  stroke(0);
  strokeWeight(20);

  saveButton = createButton("Make Your Character");
  saveButton.position(350, 10);
  saveButton.mousePressed(saveCharacter);
}

function draw() {
  stroke(20);
  strokeWeight(20);
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

  let canvasImage = canvas.toDataURL("image/png");

  const characters = JSON.parse(localStorage.getItem("characters"));

  const nameExists = characters.createdCharacters.some(
    (character) => character.name === name
  );

  if (nameExists) {
    alert("Character name already exists. Please choose a different name.");
    return;
  }

  characters.createdCharacters.push({ name: name, image: canvasImage });

  localStorage.setItem("characters", JSON.stringify(characters));
}
