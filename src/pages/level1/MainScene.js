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
    this.load.tilemapTiledJSON("jungleMap", "/assets/maps/jungleMap.tmj");
    this.load.image("tiles-jungle-floor", "/assets/tilesets/tiles-jungle.png");
    this.load.image("tiles-palm", "/assets/tilesets/palm.png");
    this.load.image("tiles-jungle-background", "/assets/tilesets/jungle.png");
    this.load.image("tiles-door", "/assets/tilesets/door.png");
  }

  create() {
    const jungleMap = this.make.tilemap({ key: "jungleMap" });

    const jungleFloor = jungleMap.addTilesetImage("tiles-jungle","tiles-jungle-floor",32,32);
    const palm = jungleMap.addTilesetImage("palm", "tiles-palm",32,32);
    const jungleBackGround = jungleMap.addTilesetImage("jungle-background","tiles-jungle-background",32,32);
    const door = jungleMap.addTilesetImage("door", "tiles-door",32,32);

    const jungleBackGroundLayer = jungleMap.createLayer("BG_Layer",jungleBackGround,-250,0);
    const jungleFloorLayer = jungleMap.createLayer("Floor_Layer",jungleFloor,-250,0);
    const doorLayer = jungleMap.createLayer("Door_Layer", door, -250, 50);
    const palmLayer = jungleMap.createLayer("Palm_Layer",palm,-250,0)

    jungleFloorLayer.setCollisionByProperty({ collision: true });

    this.matter.world.convertTilemapLayer(jungleBackGroundLayer);
    this.matter.world.convertTilemapLayer(jungleFloorLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    this.matter.world.convertTilemapLayer(palmLayer);

    this.player1 = new Player({
      scene: this,
      x: this.p1x,
      y: this.p1y,
      texture: this.char1,
      width: 30,
      height: 30,
    });

    this.add.existing(this.player1);
    this.player1.inputKeys = this.input.keyboard.createCursorKeys();

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

    this.player1.setFriction(0.05, 0.1, 0.01);
    this.player2.setFriction(0.05, 0.1, 0.01);
    this.player1.setScale(0.05);
    this.player2.setScale(2)
  }

  update() {
    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
