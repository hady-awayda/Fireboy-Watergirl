class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, width, height } = data;
    super(scene.matter.world, x, y, texture);
    this.texture = texture;
    this.scene.add.existing(this);

    this.setDisplaySize(width, height);
    // this.setScaleMode(this, Phaser.ScaleModes.FIT);
    // this.setFrictionAir(0.02);
    this.setBody({
      type: "rectangle",
      width: width - 6,
      height: height - 6,
    });
    this.setFixedRotation();
  }

  static preload(scene) {
    if (this.texture === "player1") {
      scene.load.image("player1", "/assets/images/face.png");
    } else if (this.texture === "player2") {
      scene.load.image("player2", "/assets/images/fireboy.webp");
    } else if (this.texture === "customCharacter1") {
      scene.load.image("player1", "/assets/characters/custom-character1.png");
    } else if (this.texture === "customCharacter2") {
      scene.load.image("player2", "/assets/characters/custom-character2.png");
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
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}

export default Player;
