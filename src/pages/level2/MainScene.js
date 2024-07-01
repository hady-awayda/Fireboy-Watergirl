import Player from "./Player.js";

class MainScene extends Phaser.Scene {
  constructor(p1X, p1Y, p2X, p2Y, char1, char2) {
    super("MainScene");
    this.p1x = p1X;
    this.p1y = p1Y;
    this.p2x = p2X;
    this.p2y = p2Y;
    this.char1 = char1;
    this.char2 = char2;
  }

  preload() {
    Player.preload(this, this.char1, this.char2);
    this.load.image("tiles", "/assets/images/RPG Nature Tileset.png");
    this.load.tilemapTiledJSON("map", "/assets/images/map.json");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage(
      "RPG Nature Tileset",
      "tiles",
      32,
      32,
      0,
      0
    );
    const layer1 = map.createLayer("Ground", tileset, 0, 0);
    const layer2 = map.createLayer("Rubble", tileset, 0, 0);
    layer1.setCollisionByProperty({ collide: true });
    this.matter.world.convertTilemapLayer(layer1);
    this.player1 = new Player({
      scene: this,
      x: this.p1x,
      y: this.p1y,
      texture: this.char1,
      width: 30,
      height: 30,
    });

    this.add.existing(this.player1);
    this.player1.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
    });

    this.player2 = new Player({
      scene: this,
      x: this.p2x,
      y: this.p2y,
      texture: this.char2,
      width: 30,
      height: 40,
    });

    this.add.existing(this.player2);
    this.player2.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
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
    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
