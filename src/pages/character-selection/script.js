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

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("character-selection");

  const characters = JSON.parse(
    localStorage.getItem("characters")
  ).createdCharacters;

  console.log(characters);

  renderElement("face");
  renderElement("fireboy");
  renderElement("watergirl");
  renderElement("wall");

  for (let i = 0; i < characters.length; i++) {
    renderElement(characters[i]);
  }

  function renderElement(el) {
    list.innerHTML += `
      <div class="character">
        <img src="/assets/images/${el}.png" alt="${el}" />
        <div class="character-buttons">
          <button onclick="setCharacter1('${el}')">Set as Character 1</button>
          <button onclick="setCharacter2('${el}')">Set as Character 2</button>
        </div>
      </div>`;
  }
});
