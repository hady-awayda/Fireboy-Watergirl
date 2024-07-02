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
    this.characterTouchingGround=false;
    this.canJump=true;
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
    //Detect collision with ground

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
    doorLayer.setCollisionByProperty({ nextLevel: true });

    this.matter.world.convertTilemapLayer(jungleBackGroundLayer);
    this.matter.world.convertTilemapLayer(jungleFloorLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    this.matter.world.convertTilemapLayer(palmLayer);

    // Set a name for each MatterTileBody
    jungleFloorLayer.forEachTile((tile) => {
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
    this.player1.setScale(0.05);
    this.player2.setScale(2)
    
    // Detect collisions between players and the jungleFloorLayer
    this.matter.world.on('collisionactive', (event) => {
      console.log("checking collisionactive")
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;

        console.log(bodyA.gameObject);
        console.log(bodyB.gameObject);
        //console.log(bodyA.label);
        //console.log(bodyB.label);
        
        // Check if the collision involves the jungleFloorLayer and any of the players
        if (
          (bodyA.label === 'Circle Body' && bodyB.gameObject && bodyB.label === "jungleFloorTile")
          ||(bodyB.label === 'Circle Body' && bodyA.gameObject && bodyA.label === "jungleFloorTile")){
            this.characterTouchingGround = true;
            console.log("collided with floor");
          }
        if((bodyA.label === 'Circle Body' && bodyB.gameObject && bodyB.label === "doorTile")
          ||(bodyB.label === 'Circle Body' && bodyA.gameObject && bodyA.label === "doorTile")){
            this.characterTouchingGround = true;
            console.log("collided with door");
          }
      });
    });

  }
  
  update() {

    this.player1.update();
    this.player2.update();
    
    if (Phaser.Input.Keyboard.JustDown(this.player2.inputKeys.up) && this.characterTouchingGround && this.canJump) {
      this.characterTouchingGround = false;
      this.canJump = false; // Disable further jumps
      // Set jump velocity
      this.player2.setVelocityY(-100);
    }

    // Check if player1 can jump
    if (Phaser.Input.Keyboard.JustDown(this.player1.inputKeys.up) && this.characterTouchingGround && this.canJump) {
      this.characterTouchingGround = false;
      this.canJump = false; // Disable further jumps
      // Set jump velocity
      this.player1.setVelocityY(-100);
    }

    // Reset characterTouchingGround to false only when characters are in the air
    if (this.characterTouchingGround) {
      if (this.player1.body.velocity.y === 0 && this.player2.body.velocity.y === 0) {
        this.characterTouchingGround = true;
      } else {
        this.characterTouchingGround = false;
      }
    }

    if(!this.characterTouchingGround){
      setTimeout(() => {
        this.canJump = true; // Enable jumping again after timeout
      }, 300); // Adjust timeout duration as needed
    }
  }
  
  }

export default MainScene;
