// Define the SceneMain class
class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
  
    preload() {
      // Load the tilemap JSON and the tileset images
      //this.load.tilemapTiledJSON('dungeonMap', "../../utils/maps/Dungeon.tmj");

      this.load.tilemapTiledJSON('jungleMap', "../../utils/maps/jungleMap.json");
      this.load.image("tiles-jungle-floor", "../../../assets/maps/tiles-jungle.png"); 
      this.load.image("tiles-palm", "../../../assets/maps/palm.png"); 
      this.load.image("tiles-jungle-background", "../../../assets/maps/jungle.png");
      this.load.image("tiles-door", "../../../assets/maps/door.png");
    }
  
    create() {
      // Create the tilemap using the key from preload
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
  
      // Create the layers from the map and the tilesets

      //map.createLayer("Layer name in tiled ", tileset used in this layer, 0, 0);
      const jungleFloorLayer = jungleMap.createLayer("Floor_Layer", jungleFloor, 0, 0);
      const palmLayer = jungleMap.createLayer("Palm_Layer", palm, 0, 0);
      const jungleBackGroundLayer = jungleMap.createLayer("BG_Layer", jungleBackGround, 0, 0);
      const doorLayer = jungleMap.createLayer("Door_Layer", door, 0, 0);
  
      // Scale up the tilemap layer
      //TilesLayer.setScale(2); // Adjust this value to scale up the map
  
      // Add the player sprite with physics
      this.player = this.physics.add.sprite(100, 100, "face");
      this.player.setScale(2);
  
      // Enable collision for the layers
      //TilesLayer.setCollisionByExclusion([-1]);
      //chestLayer.setCollisionByExclusion([-1]);
  
      // Add collision between player and layers
      //this.physics.add.collider(this.player, TilesLayer);
      //this.physics.add.collider(this.player, chestLayer);
  
      // Set the camera to follow the player
      this.cameras.main.startFollow(this.player);
  
      // Set the camera bounds to match the map size
      this.cameras.main.setBounds(0, 0, jungleMap.widthInPixels * 3, jungleMap.heightInPixels * 2); // Adjust for scaling
  
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
    if (this.spacebar.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-300); // Adjust the value to control jump height
  }
  }
}
  
  
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: SceneMain
    
};
  
  
  // Create the Phaser game
  const game = new Phaser.Game(config);
  
  export default SceneMain;
  