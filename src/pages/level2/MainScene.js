import Player from "./Player.js";

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    Player.preload(this);
  }

  create() {
    console.log("create");
    // this.box = this.matter.add.sprite(256, 100, "box");

    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "box",
    });
    this.add.existing(this.player);
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      //   up: Phaser.Input.Keyboard.KeyCodes.W,
      //   down: Phaser.Input.Keyboard.KeyCodes.S,
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
    this.player.update();
  }
}

export default MainScene;
