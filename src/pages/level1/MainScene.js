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
  }

  create() {
    const jungleMap = this.make.tilemap({ key: 'jungleMap' });
    console.log('Tilemap created:', jungleMap);

    // Add the tileset images to the map
    const jungleFloor = jungleMap.addTilesetImage("tiles-jungle", "tiles-jungle-floor");
    const palm = jungleMap.addTilesetImage("palm", "tiles-palm");
    const jungleBackGround = jungleMap.addTilesetImage("jungle-background", "tiles-jungle-background");
    const door = jungleMap.addTilesetImage("door", "tiles-door");

    const jungleBackGroundLayer = jungleMap.createLayer("BG_Layer", jungleBackGround, 0, 0);
    const jungleFloorLayer = jungleMap.createLayer("Floor_Layer", jungleFloor, 0, 0); 
    const doorLayer = jungleMap.createLayer("Door_Layer", door, 1030, 0);

    // Enable collision for the jungleFloorLayer and doorLayer
    

    doorLayer.setCollisionByProperty({ collides: false });  // Set to true if you need collisions with the door layer

    // Convert the layers to Matter.js bodies
    this.jungleFloorBodies = this.matter.world.convertTilemapLayer(jungleFloorLayer, {
      isStatic: true  // Make sure the jungleFloorLayer is static
    });
  console.log("look at this",jungleFloorLayer.layer.name=="Floor_Layer")
    this.doorBodies = this.matter.world.convertTilemapLayer(doorLayer, {
      isStatic: true  // Make sure the doorLayer is static
    });

    // Set up Player 1
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

    // Set up Player 2
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

    this.physics.add.collider(jungleFloorLayer,this.player1)
    
    jungleFloorLayer.setCollisionByProperty({ collides: true });
    jungleFloorLayer.setCollision(3);
    this.player1.setScale(0.05);
    this.player2.setScale(1.8);

    // Set collision categories and masks for the players
    this.player1.setCollisionCategory(1);
    this.player1.setCollidesWith([2, 3]);  // Player 1 collides with jungleFloor and door

    this.player2.setCollisionCategory(1);
    this.player2.setCollidesWith([2]);  // Player 2 collides with jungleFloor


    // Debugging
    this.matter.world.debugGraphic = this.add.graphics();
    this.matter.world.debugGraphic.lineStyle(1, 0x00ff00);
    this.matter.world.drawDebug = true;

    // Handle collision events
    this.matter.world.on('collisionstart', (event) => {
      event.pairs.forEach((pair) => {
        const { bodyA, bodyB } = pair;
        console.log(bodyA,bodyB)

        if (
          (bodyA.gameObject === this.player1 && bodyB.layer.name=="Floor_Layer") ||
          (bodyB.gameObject === this.player1 && bodyA.bodyB.layer.name=="Floor_Layer")
        ) {
          console.log('Player 1 collided with jungleFloor!');
        }

        if (
          (bodyA.gameObject === this.player1 && bodyB.collisionFilter.category === 3) ||
          (bodyB.gameObject === this.player1 && bodyA.collisionFilter.category === 3)
        ) {
          console.log('Player 1 collided with doorLayer!');
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
