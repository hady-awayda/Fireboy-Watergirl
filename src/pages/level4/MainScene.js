import Player from "/src/utils/helpers/Player.js";

class MainScene extends Phaser.Scene {
  constructor(p1X, p1Y, p2X, p2Y, char1, char2) {
    super("MainScene");
    this.p1x = p1X;
    this.p1y = p1Y;
    this.p2x = p2X;
    this.p2y = p2Y;
    this.char1 = char1;
    this.char2 = char2;
    this.char1 = char1;
    this.char2 = char2;
    this.canJump = true;
  }

  preload() {
    Player.preload(this, this.char1, this.char2);

    this.load.tilemapTiledJSON("spookyMap", "/assets/maps/spookie.tmj");
    this.load.image("tiles-skulls-floor", "/assets/tilesets/tiles-skulls.png");
    this.load.image("tiles-skull", "/assets/tilesets/skull.png");
    this.load.image("tiles-spooky-background", "/assets/tilesets/spooky.png");
    this.load.image("tiles-door", "/assets/tilesets/door.png");
    
  }

  create() {
    //Detect collision with ground

    const spookyMap = this.make.tilemap({ key: "spookyMap" });

    const spookyFloor = spookyMap.addTilesetImage("tiles-skulls","tiles-skulls-floor",32,32);
    const skull = spookyMap.addTilesetImage("skull", "tiles-skull",32,32);
    const spookyBackGround = spookyMap.addTilesetImage("spooky","tiles-spooky-background",32,32);
    const door = spookyMap.addTilesetImage("door", "tiles-door",32,32);

    const spookyBackGroundLayer = spookyMap.createLayer("background",spookyBackGround,-250,0);
    const spookyFloorLayer = spookyMap.createLayer("ground",spookyFloor,-250,0);
    const skullLayer = spookyMap.createLayer("decoration", skull, -250, 0);
    const doorLayer = spookyMap.createLayer("door",door,-250,0)


    spookyFloorLayer.setCollisionByProperty({ collision: true });
    doorLayer.setCollisionByProperty({ nextLevel: true });

    this.matter.world.convertTilemapLayer(spookyBackGroundLayer);
    this.matter.world.convertTilemapLayer(spookyFloorLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    this.matter.world.convertTilemapLayer(skullLayer);

    spookyFloorLayer.forEachTile((tile) => {
      if (tile.physics.matterBody) {
        tile.physics.matterBody.body.label = "spookyFloorLayer";
      }
    });

    doorLayer.forEachTile((tile) => {
      if (tile.physics.matterBody) {
        tile.physics.matterBody.body.label = "doorTile";
      }
    });

    this.player1 = new Player({
      label : "player1",
      scene: this,
      x: this.p1x,
      y: this.p1y,
      texture: this.char1,
      width: 30,
      height: 30,
    });

    this.add.existing(this.player1);
    this.player1.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.SPACE,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
    this.player2 = new Player({
      label : 'player2',
      scene: this,
      x: this.p2x,
      y: this.p2y,
      texture: this.char2,
      width: 30,
      height: 30,
    });

    this.add.existing(this.player2);
    this.player2.inputKeys = this.input.keyboard.createCursorKeys(); //detect arrow key presses for player2 (right-side)

    
    this.player2.setFriction(0.05, 0.1, 0.01);
    this.player1.setFriction(0.05, 0.1, 0.01);

    this.matter.world.on("collisionactive", (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        if (
          (bodyA.label === "Circle Body" &&
            bodyB.gameObject &&
            bodyB.label === "spookyFloorLayer") ||
          (bodyB.label === "Circle Body" &&
            bodyA.gameObject &&
            bodyA.label === "spookyFloorLayer")
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
          window.location.href = "/src/pages/thanks-for-playing/index.html";
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
      this.player2.setVelocityY(-100);
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.player1.inputKeys.up) &&
      this.characterTouchingGround &&
      this.canJump
    ) {
      this.characterTouchingGround = false;
      this.canJump = false;
      this.player1.setVelocityY(-100);
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
