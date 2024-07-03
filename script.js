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
