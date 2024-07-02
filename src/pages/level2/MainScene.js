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
    this.load.tilemapTiledJSON("map", "/assets/maps/ruins.tmj");
    this.load.image("bg", "/assets/tilesets/ruins.png");
    this.load.image("tiles", "/assets/tilesets/tiles-wood.png");
    this.load.image("door", "/assets/tilesets/door.png");
    this.load.image("decoration", "/assets/tilesets/skull.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    this.jumpBunny();

    const bgTileset = map.addTilesetImage("bg", "bg", 32, 32, 0, 0);
    const groundTileset = map.addTilesetImage("tiles", "tiles", 32, 32, 0, 0);
    const doorTileset = map.addTilesetImage("door", "door", 64, 64, 0, 0);
    const skullTileset = map.addTilesetImage(
      "decoration",
      "decoration",
      64,
      64,
      0,
      0
    );

    const bgLayer = map.createLayer("Background", bgTileset, 0, 0);
    const groundLayer = map.createLayer("Ground", groundTileset, 0, 0);
    const doorLayer = map.createLayer("Door", doorTileset, 0, 0);
    const skullLayer = map.createLayer("Decoration", skullTileset, 0, 0);

    groundLayer.setCollisionByProperty({ collision: true });
    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(bgLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    this.matter.world.convertTilemapLayer(skullLayer);

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

    this.player1.setBounce(0.2);
    this.player1.setFriction(0.05, 0.1, 0.01);

    this.player2 = new Player({
      scene: this,
      x: this.p2x,
      y: this.p2y,
      texture: this.char2,
      width: 30,
      height: 30,
    });

    this.add.existing(this.player2);
    this.player2.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
