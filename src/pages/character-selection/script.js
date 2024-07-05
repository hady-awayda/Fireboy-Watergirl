import renderElement from "/src/utils/components/Character-Selector.js";

if (!localStorage.getItem("characters")) {
  localStorage.setItem(
    "characters",
    JSON.stringify({
      createdCharacters: [],
      selectedCharacters: {
        char1: null,
        char2: null,
      },
    })
  );
}

function setCharacter1(characterKey) {
  let characters = JSON.parse(localStorage.getItem("characters"));
  characters.selectedCharacters.char1 = characterKey;
  localStorage.setItem("characters", JSON.stringify(characters));
  console.log(localStorage);
}

function setCharacter2(characterKey) {
  let characters = JSON.parse(localStorage.getItem("characters"));
  characters.selectedCharacters.char2 = characterKey;
  localStorage.setItem("characters", JSON.stringify(characters));
  console.log(localStorage);
}

function resetCharacters() {
  let characters = JSON.parse(localStorage.getItem("characters"));
  characters.createdCharacters = [];
  characters.selectedCharacters = {
    char1: null,
    char2: null,
  };
  localStorage.setItem("characters", JSON.stringify(characters));
  renderCharacterList();
  console.log(localStorage);
}

function deleteCharacter(characterName) {
  let characters = JSON.parse(localStorage.getItem("characters"));
  characters.createdCharacters = characters.createdCharacters.filter(
    (char) => char.name !== characterName
  );
  localStorage.setItem("characters", JSON.stringify(characters));
  renderCharacterList();
}

function renderCharacterList() {
  const list = document.getElementById("character-selection");
  list.innerHTML = "";

  const characters = JSON.parse(
    localStorage.getItem("characters")
  ).createdCharacters;

  console.log(characters);

  renderElement(list, "left");
  renderElement(list, "right");
  renderElement(list, "left2");
  renderElement(list, "right2");
  renderElement(list, "face");
  renderElement(list, "fireboy");
  renderElement(list, "watergirl");

  for (let i = 0; i < characters.length; i++) {
    renderElement(list, characters[i].name, characters[i].image);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCharacterList();
});

window.setCharacter1 = setCharacter1;
window.setCharacter2 = setCharacter2;
window.resetCharacters = resetCharacters;
window.deleteCharacter = deleteCharacter;
