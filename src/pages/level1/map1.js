// Define the SceneMain class
class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
  
    preload() {
      // Load the tilemap JSON and the tileset images
      //this.load.tilemapTiledJSON('dungeonMap', "../../utils/maps/Dungeon.tmj");
      
      //this.load.tilemapTiledJSON('dungeonMap', "../../utils/maps/jungle_map_1..tmj");
      this.load.image("tiles1", "../../../assets/images/Wall.png"); 
      this.load.image("tiles2", "../../../assets/images/Player0.png"); 
      this.load.image("face", "../../../assets/images/face.png");
      this.load.image("floor", "../../../assets/images/Floor.png");
      this.load.image("chest", "../../../assets/images/Chest0.png");
      
    }
  
    create() {
      // Create the tilemap using the key from preload
      const map = this.make.tilemap({ key: "dungeonMap" });
  
      // Add the tileset images to the map
      const tileset1 = map.addTilesetImage("Wall", "tiles1");
      const tileset2 = map.addTilesetImage("Player0", "tiles2");
      const tileset3 = map.addTilesetImage("Floor", "floor");
      const tileset4 = map.addTilesetImage("Chest0", "chest");
  
      // Create the layers from the map and the tilesets
      const TilesLayer = map.createLayer("Tiles", [tileset1, tileset3], 0, 0);
      const SpriteLayer = map.createLayer("Sprites", tileset2, 0, 0);
      const chestLayer = map.createLayer("toCollideWith", tileset4, 0, 0);
  
      // Scale up the tilemap layer
      TilesLayer.setScale(4); // Adjust this value to scale up the map
      SpriteLayer.setScale(4);
      chestLayer.setScale(4);
  
      // Add the player sprite with physics
      this.player = this.physics.add.sprite(100, 100, "face");
      this.player.setScale(2);
  
      // Enable collision for the layers
      TilesLayer.setCollisionByExclusion([-1]);
      chestLayer.setCollisionByExclusion([-1]);
  
      // Add collision between player and layers
      this.physics.add.collider(this.player, TilesLayer);
      this.physics.add.collider(this.player, chestLayer);
  
      // Set the camera to follow the player
      this.cameras.main.startFollow(this.player);
  
      // Set the camera bounds to match the map size
      this.cameras.main.setBounds(0, 0, map.widthInPixels * 3, map.heightInPixels * 2); // Adjust for scaling
  
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
  
  // Phaser game configuration
  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 900,
    scene: SceneMain,
    physics: {
      default: "arcade",
      arcade: {
        debug: false
      }
    }
  };
  
  // Create the Phaser game
  const game = new Phaser.Game(config);
  
  export default SceneMain;
  