// Define the SceneMain class
class SceneMain extends Phaser.Scene {
    constructor() {
      super({ key: "SceneMain" });
    }
  
    preload() {
      // Load the tilemap JSON and the tileset images
      this.load.tilemapTiledJSON('dungeonMap', "../../utils/maps/Dungeon.tmj");
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
      const chestLayer = map.createLayer("toCollideWith",tileset4,0,0)
  
      // Add the player sprite with physics
      this.player = this.physics.add.sprite(100, 100, "face");
      this.player.setScale(0.5);
  
      // Create cursor keys for player movement
      this.cursors = this.input.keyboard.createCursorKeys();
  
      //COLLISIONS
      chestLayer.setCollisionByExclusion([-1]);
      //chestLayer.setTileIndexCallback(2760, this.hitChest, this); // 2760 is the global ID of the first tile in the tileset
      this.physics.add.collider(this.player,chestLayer);
    }
  
    update() {
      // Reset player velocity
      this.player.setVelocity(0);
  
      // Update logic for player movement
      if (this.cursors.up.isDown) {
        this.player.setVelocityY(-100);
      }
      if (this.cursors.down.isDown) {
        this.player.setVelocityY(100);
      }
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-100);
      }
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(100);
      }
    }
  }
  
  // Phaser game configuration
  const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
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
  