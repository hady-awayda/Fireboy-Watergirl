class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture } = data;
    super(scene.matter.world, x, y, texture);
    this.scene.add.existing(this);
  }

  static preload(scene) {
    console.log("preload");
    scene.load.image("box", "/assets/images/face.png");
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
