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
  characters.selectedCharacters = {
    char1: null,
    char2: null,
  };
  localStorage.setItem("characters", JSON.stringify(characters));
  console.log(localStorage);
}
