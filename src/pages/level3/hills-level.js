// Define the SceneMain class
class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
      this.isJump = false;
    }
  
    preload() {
      
        
      // Load the tilemap JSON and the tileset images
      //this.load.tilemapTiledJSON('dungeonMap', "../../utils/maps/Dungeon.tmj");

      this.load.tilemapTiledJSON('hillsMap', "../../utils/maps/hills.tmj");
      this.load.image("tiles-stones-floor", "../../../assets/maps/tiles-stones.png"); 
      this.load.image("tiles-palm", "../../../assets/maps/palm.png"); 
      this.load.image("tiles-hills-background", "../../../assets/maps/hills.png");
      this.load.image("tiles-door", "../../../assets/maps/door.png");
      this.load.image("face", "../../../assets/images/face.png");
    }
  
    create() {
      // Create the tilemap using the key from preload
      const hillsMap = this.make.tilemap({ key: "hillsMap" });
      console.log('Tilemap created:', hillsMap);
      
    // Add the tileset images to the map

    //  map.addTilesetImage("tileset name in TILED app", "key in load.image above");
    const hillsFloor = hillsMap.addTilesetImage("tiles-hills", "tiles-stones-floor");
    console.log('Tileset hillsFloor added:', hillsFloor);
    const palm = hillsMap.addTilesetImage("palm", "tiles-palm");
    console.log('Tileset palm added:', palm);
    const hillsBackGround = hillsMap.addTilesetImage("hills-background", "tiles-hills-background");
    console.log('Tileset hillsBackGround added:', hillsBackGround);
    const door = jungleMap.addTilesetImage("door", "tiles-door");
    console.log('Tileset door added:', door);
  
      // Create the layers from the map and the tilesets

      //map.createLayer("Layer name in tiled ", tileset used in this layer, 0, 0);
      const hillsBackGroundLayer = hillsMap.createLayer("BG_Layer", hillsBackGround, 0, 0);
      const hillsFloorLayer = hillsMap.createLayer("Floor_Layer", hillsFloor, 0, 0);
            
      const doorLayer = hillsMap.createLayer("Door_Layer", door, 1000, 0);
      //const palmLayer = jungleMap.createLayer("Palm_Layer", palm, 0, 0);

  
      // Scale up the tilemap layer
      /* 
      jungleFloorLayer.setScale(0.8); // Adjust this value to scale up the map
      palmLayer.setScale(0.8);
      jungleBackGroundLayer.setScale(0.5);
      doorLayer.setScale(0.8);*/
      // Add the player sprite with physics
      this.player = this.physics.add.sprite(400, 300, "face");
      this.player.setScale(2);

  
      // Set the camera to follow the player
      //this.cameras.main.startFollow(this.player);
  
      // Set the camera bounds to match the map size
      //this.cameras.main.setBounds(0, 0, jungleMap.widthInPixels * 3, jungleMap.heightInPixels * 2); // Adjust for scaling
  
      // Create cursor keys for player movement
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
  
  update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Update logic for player movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    }
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    }
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }
    // Jump logic
    if (this.spacebar.isDown) {
        this.player.setVelocityY(-1500); // Adjust the value to control jump height
        this.isJumping = true; // Set the jumping flag
    }
  }
}
  
  
  const config = {
    type: Phaser.AUTO,
    width: 2400,
    height: 775,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 20000 },
            debug: false
        }
    },
    scene: SceneMain
    
};
  
  
  // Create the Phaser game
  const game = new Phaser.Game(config);
  
  export default SceneMain;
  