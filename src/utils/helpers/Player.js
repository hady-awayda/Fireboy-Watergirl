// import Phaser from "phaser";

class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, width, height } = data;
    super(scene.matter.world, x, y, texture);
    this.scene.add.existing(this);

    this.setDisplaySize(width, height);
    this.setBody({
      type: "circle",
      width: width,
      height: height,
    });
    this.setFixedRotation();
  }

  static preload(scene, char1, char2) {
    const characters = JSON.parse(
      localStorage.getItem("characters")
    ).createdCharacters;

    if (char1 === "player1" || char2 === "player1") {
      scene.load.image("player1", "/assets/images/face.png");
    }
    if (char1 === "player2" || char2 === "player2") {
      scene.load.image("player2", "/assets/images/fireboy.png");
    }

    characters.forEach((char) => {
      if (char1 === char.name || char2 === char.name) {
        scene.textures.addBase64(char.name, char.image);
      }
    });

    if (char1 !== "player1" && char1 !== "player2") {
      scene.load.image(char1, `/assets/images/${char1}.png`);
    }
    if (char2 !== "player1" && char2 !== "player2") {
      scene.load.image(char2, `/assets/images/${char2}.png`);
    }
  }

  update() {
    const speed = 5;
    let playerVelocity = new Phaser.Math.Vector2();

    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}

export default Player;
