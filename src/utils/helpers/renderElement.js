function renderElement(parent, name, image = null) {
  const src = image ? image : `/assets/images/${name}.png`;

  parent.innerHTML += `
    <div class="character">
      <img src="${src}" alt="${name}" />
      <div class="character-buttons-container">
        <div class="character-buttons">
          <button onclick="setCharacter1('${name}')">Set as Character 1</button>
          <button onclick="setCharacter2('${name}')">Set as Character 2</button>
        </div>
        ${
          image
            ? `<button onclick="deleteCharacter('${name}')">Delete Character</button>`
            : ""
        }
      </div>
    </div>`;
}

export default renderElement;
