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

const storedCharacters = JSON.parse(localStorage.getItem("characters"));
const selectedCharacters = storedCharacters?.selectedCharacters;

const char1 = selectedCharacters?.char1 || "right";
const char2 = selectedCharacters?.char2 || "right2";

const image1 = storedCharacters.createdCharacters.find(
  (char) => char.name === char1
)?.image;

const image2 = storedCharacters.createdCharacters.find(
  (char) => char.name === char2
)?.image;

const character1 = document.getElementById("char1");
const character2 = document.getElementById("char2");

renderElement(character1, char1, image1);
renderElement(character2, char2, image2);

function renderElement(parent, name, image = null) {
  const src = image ? image : `/assets/images/${name}.png`;

  parent.innerHTML = `
    <img 
      src="${src}" 
      alt="${name}" 
      class="parallax"
      data-speed="0.26"
      data-speedz="-15"
    />`;
}

const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0,
  yValue = 0;

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speed = el.dataset.speed;
    let speedz = el.dataset.speedz;
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `translateX(calc(-50% + ${
      xValue * speed
    }px)) translateY( calc(-50% + ${
      yValue * speed * 0.66
    }px)) perspective(3300px) translateZ(${zValue * speedz}px)`;
  });
}

update(0);

window.addEventListener("mousemove", (event) => {
  xValue = event.clientX - window.innerWidth / 2;
  yValue = event.clientY - window.innerHeight / 2;

  update(event.clientX);
});
