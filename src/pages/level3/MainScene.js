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
    this.characterTouchingGround1=false;
    this.characterTouchingGround2=false;
    this.characterTouchingGround=false;
  }

  preload() {
    Player.preload(this, this.char1, this.char2);

    this.load.tilemapTiledJSON("hillsMap", "/assets/maps/hills.tmj");
    this.load.image("tiles-stones-floor", "/assets/tilesets/tiles-stones.png");
    this.load.image("tiles-palm", "/assets/tilesets/palm.png");
    this.load.image("tiles-hills-background", "/assets/tilesets/hills.png");
    this.load.image("tiles-door", "/assets/tilesets/door.png");
    
    // this.load.tilemapTiledJSON("jungleMap", "/assets/maps/jungleMap.tmj");
    // this.load.image("tiles-jungle-floor", "/assets/tilesets/tiles-jungle.png");
    // this.load.image("tiles-palm", "/assets/tilesets/palm.png");
    // this.load.image("tiles-jungle-background", "/assets/tilesets/jungle.png");
    // this.load.image("tiles-door", "/assets/tilesets/door.png");
  }

  create() {
    //Detect collision with ground

    const hillsMap = this.make.tilemap({ key: "hillsMap" });

<<<<<<< HEAD
    const hillsFloor = hillsMap.addTilesetImage("tiles-hills","tiles-stones-floor",32,32);
    const palm = hillseMap.addTilesetImage("palm", "tiles-palm",32,32);
    const hillsBackGround = hillsMap.addTilesetImage("hills-background","tiles-hills-background",32,32);
=======
    const hillsFloor = hillsMap.addTilesetImage("tiles-stones","tiles-stones-floor",32,32);
    const palm = hillsMap.addTilesetImage("palm", "tiles-palm",32,32);
    const hillsBackGround = hillsMap.addTilesetImage("hills","tiles-hills-background",32,32);
>>>>>>> d2ece243aea23f1a07822ecd5cd992dbd2bc4e34
    const door = hillsMap.addTilesetImage("door", "tiles-door",32,32);

    const hillsBackGroundLayer = hillsMap.createLayer("background",hillsBackGround,-250,0);
    const hillsFloorLayer = hillsMap.createLayer("ground",hillsFloor,-250,0);
<<<<<<< HEAD
    const doorLayer = hillsMap.createLayer("door", door, -250, 50);
    const palmLayer = hillsMap.createLayer("decoration",palm,-250,0)
=======
    const doorLayer = hillsMap.createLayer("decoration", door, -250, 50);
    //const palmLayer = hillsMap.createLayer("decoration",palm,-250,0)
>>>>>>> d2ece243aea23f1a07822ecd5cd992dbd2bc4e34



    // const jungleBackGroundLayer = jungleMap.createLayer("BG_Layer",jungleBackGround,-250,0);
    // const jungleFloorLayer = jungleMap.createLayer("Floor_Layer",jungleFloor,-250,0);
    // const doorLayer = jungleMap.createLayer("Door_Layer", door, -250, 50);
    // const palmLayer = jungleMap.createLayer("Palm_Layer",palm,-250,0)

    hillsFloorLayer.setCollisionByProperty({ collision: true });

    this.matter.world.convertTilemapLayer(hillsBackGroundLayer);
    this.matter.world.convertTilemapLayer(hillsFloorLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
    //this.matter.world.convertTilemapLayer(palmLayer);

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

        //console.log(bodyA.label);
        //console.log(bodyB.label);
        
        // Check if the collision involves the jungleFloorLayer and any of the players
        if (
          (bodyA.label === 'Circle Body' && bodyB.gameObject && bodyB.label === "Rectangle Body")
          ||(bodyB.label === 'Circle Body' && bodyA.gameObject && bodyA.label === "Rectangle Body")){
            this.characterTouchingGround = true;
            //console.log("reached first check")
            console.log("player collided with floor !!!");
          }
          /*
          if(
          (bodyB.label === 'Circle Body' && bodyA.gameObject && bodyA.label === "Rectangle Body") 
          ||(bodyA.label === 'Circle Body' && bodyB.gameObject && bodyB.label === "Rectangle Body")) {
          this.characterTouchingGround2 = true;  // Set the flag when collision occurs
          //console.log("reached second check")
          console.log("player collided 222!!!")
        }*/
      });
    });

  }
  
  update() {
    this.player1.update();
    this.player2.update();
    
    
    if (Phaser.Input.Keyboard.JustDown(this.player2.inputKeys.up) && this.characterTouchingGround) {
      this.characterTouchingGround = false;
      //Set skate velocity
      this.player2.setVelocityY(-110);
    }
    else if (!this.characterTouchingGround){
      
    }
    if (Phaser.Input.Keyboard.JustDown(this.player1.inputKeys.up) && this.characterTouchingGround) {
      this.characterTouchingGround = false;
      //Set skate velocity
      this.player1.setVelocityY(-110);
    }

    else if (!this.characterTouchingGround){
      //this.player1.inputKeys.up.enabled = false;
    }
  }
  }

export default MainScene;
