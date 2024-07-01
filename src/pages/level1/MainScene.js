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
    this.load.tilemapTiledJSON('jungleMap', "../../utils/maps/jungleMap.tmj");
      this.load.image("tiles-jungle-floor", "../../../assets/maps/tiles-jungle.png"); 
      this.load.image("tiles-palm", "../../../assets/maps/palm.png"); 
      this.load.image("tiles-jungle-background", "../../../assets/maps/jungle.png");
      this.load.image("tiles-door", "../../../assets/maps/door.png");
      this.load.image("face", "../../../assets/images/face.png");
    // this.load.image("tiles", "/assets/images/RPG Nature Tileset.png");
    // this.load.tilemapTiledJSON("map", "/assets/images/map.json");
  }

  create() {
    const jungleMap = this.make.tilemap({ key: "jungleMap" });
      console.log('Tilemap created:', jungleMap);
      
    // Add the tileset images to the map

    //  map.addTilesetImage("tileset name in TILED app", "key in load.image above");
    const jungleFloor = jungleMap.addTilesetImage("tiles-jungle", "tiles-jungle-floor");
    console.log('Tileset jungleFloor added:', jungleFloor);
    const palm = jungleMap.addTilesetImage("palm", "tiles-palm");
    console.log('Tileset palm added:', palm);
    const jungleBackGround = jungleMap.addTilesetImage("jungle-background", "tiles-jungle-background");
    console.log('Tileset jungleBackGround added:', jungleBackGround);
    const door = jungleMap.addTilesetImage("door", "tiles-door");
    console.log('Tileset door added:', door);
  
    const jungleBackGroundLayer = jungleMap.createLayer("BG_Layer", jungleBackGround, 0, 0);
    const jungleFloorLayer = jungleMap.createLayer("Floor_Layer", jungleFloor, 0, 0); 
    const doorLayer = jungleMap.createLayer("Door_Layer", door, 1030, 0);

    this.matter.world.convertTilemapLayer(jungleFloorLayer);
    this.matter.world.convertTilemapLayer(doorLayer);
      
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
    
    this.player1.setScale(0.05);
    this.player2.setScale(1.8);

    //COLLISIONS:
      this.player1.setCollisionCategory(1);  
      this.player1.setCollidesWith(2);  

      jungleFloorLayer.setCollisionCategory(2);  
      jungleFloorLayer.setCollidesWith(1);  

    // Collision between players
  this.matter.world.on('collisionstart', (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      if (
        (bodyA.gameObject === this.player1 && bodyB.gameObject === this.player2) ||
        (bodyA.gameObject === this.player2 && bodyB.gameObject === this.player1)
      ) {
        console.log('Player 1 and Player 2 collided!');
      }
    });
  });

  //collision between player 1 and other layers
  
  this.matter.world.on('collisionstart', (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      if (
        (bodyA.gameObject === this.player1 && bodyB.gameObject === jungleFloorLayer) ||
        (bodyA.gameObject ===  jungleFloorLayer&& bodyB.gameObject === this.player1)
      ) {
        console.log('Player 1 and jungleFloor collided!');
      }
      else {
        // Handle cases where gameObject is not defined
        const objectA = bodyA.gameObject ? bodyA.gameObject : 'unknown';
        const objectB = bodyB.gameObject ? bodyB.gameObject : 'unknown';

        console.log('Collision with unknown objects:', objectA, objectB);
      }
    });
  });

  }

  update() {
    this.player1.update();
    this.player2.update();
  }
}

export default MainScene;
