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
    this.load.tilemapTiledJSON("map", "/assets/maps/ruins.json");
    this.load.image("tiles-ruins", "/assets/tilesets/ruins.png");
    this.load.image("tiles-door", "/assets/tilesets/door.png");
    this.load.image("tiles-skull", "/assets/tilesets/skull.png");
    this.load.image("tiles", "/assets/tilesets/tiles-wood.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileSet1 = map.addTilesetImage("tiles", "tiles-wood", 32, 32, 0, 0);
    const tileSet2 = map.addTilesetImage("tiles", "tiles-ruins", 32, 32, 0, 0);
    const tileSet3 = map.addTilesetImage("tiles", "tiles-skull", 32, 32, 0, 0);
    const layer1 = map.createLayer("Ground", tileSet1, 0, 0);
    const layer2 = map.createLayer("Rubble", tileSet2, 0, 0);
    // layer1.setCollisionByProperty({ collide: true });
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
  }

  update() {
    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
