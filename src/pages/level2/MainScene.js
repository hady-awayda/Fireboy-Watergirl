class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    console.log("preload");
    this.load.image("box", "/assets/images/face.png");
  }

  create() {
    console.log("create");
    // this.box = this.matter.add.sprite(256, 100, "box");

    this.player = new Phaser.Physics.Matter.Sprite(
      this.matter.world,
      0,
      0,
      "box"
    );
    this.add.existing(this.player);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phase.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      //   up: Phaser.Input.Keyboard.KeyCodes.W,
      //   down: Phase.Input.Keyboard.KeyCodes.S,
      //   left: Phaser.Input.Keyboard.KeyCodes.A,
      //   right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    // // Add a static ground
    // this.matter.add.rectangle(256, 500, 512, 50, { isStatic: true });

    // // Add a box to the scene
    // this.box = this.matter.add.image(256, 100, "box");
    // this.box.setBounce(0.5);

    // // Set up collision detection
    // this.matterCollision.addOnCollideStart({
    //   objectA: this.box,
    //   callback: (data) => {
    //     console.log("Collision detected!");
    //   },
    // });

    // // Debug output
    // console.log("Matter.Collision:", this.matterCollision);
  }

  update() {
    console.log("update");
    const speed = 2.5;
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
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}

export default MainScene;
