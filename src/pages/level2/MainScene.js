import Player from "/src/utils/helpers/Player.js";
// import Phaser from "phaser";

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
    this.load.image("decor", "/assets/tilesets/skull.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const bgTileset = map.addTilesetImage("bg", "bg", 32, 32);
    const groundTileset = map.addTilesetImage("tiles", "tiles", 32, 32);
    const doorTileset = map.addTilesetImage("door", "door", 64, 64);
    const skullTileset = map.addTilesetImage("decoration", "decor", 64, 64);

    const bgLayer = map.createLayer("Background", bgTileset, 0, 0);
    const groundLayer = map.createLayer("Ground", groundTileset, 0, 0);
    const doorLayer = map.createLayer("Door", doorTileset, 0, 0);
    const skullLayer = map.createLayer("Decoration", skullTileset, 0, 0);

    groundLayer.setCollisionByProperty({ collision: true });
    doorLayer.setCollisionByProperty({ nextLevel: true });

    this.matter.world.convertTilemapLayer(groundLayer);
    this.matter.world.convertTilemapLayer(bgLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    this.matter.world.convertTilemapLayer(skullLayer);

    groundLayer.forEachTile((tile) => {
      if (tile.physics.matterBody) {
        tile.physics.matterBody.body.label = "jungleFloorTile";
      }
    });

    doorLayer.forEachTile((tile) => {
      if (tile.physics.matterBody) {
        tile.physics.matterBody.body.label = "doorTile";
      }
    });

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

    this.matter.world.on("collisionactive", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (
          (bodyA.label === "Circle Body" &&
            bodyB.gameObject &&
            bodyB.label === "jungleFloorTile") ||
          (bodyB.label === "Circle Body" &&
            bodyA.gameObject &&
            bodyA.label === "jungleFloorTile")
        ) {
          this.characterTouchingGround = true;
        }
        if (
          (bodyA.label === "Circle Body" &&
            bodyB.gameObject &&
            bodyB.label === "doorTile") ||
          (bodyB.label === "Circle Body" &&
            bodyA.gameObject &&
            bodyA.label === "doorTile")
        ) {
          this.characterTouchingGround = true;
          window.location.href = "/src/pages/level3/index.html";
        }
      });
    });
  }

  update() {
    this.player1.update();
    this.player2.update();

    if (
      Phaser.Input.Keyboard.JustDown(this.player2.inputKeys.up) &&
      this.characterTouchingGround &&
      this.canJump
    ) {
      this.characterTouchingGround = false;
      this.canJump = false;
      this.player2.setVelocityY(-70);
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.player1.inputKeys.up) &&
      this.characterTouchingGround &&
      this.canJump
    ) {
      this.characterTouchingGround = false;
      this.canJump = false;
      this.player1.setVelocityY(-70);
    }

    if (this.characterTouchingGround) {
      if (
        this.player1.body.velocity.y === 0 &&
        this.player2.body.velocity.y === 0
      ) {
        this.characterTouchingGround = true;
      } else {
        this.characterTouchingGround = false;
      }
    }

    if (!this.characterTouchingGround) {
      setTimeout(() => {
        this.canJump = true;
      }, 300);
    }
  }
}

export default MainScene;
