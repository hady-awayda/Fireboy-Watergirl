// Define the SceneMain class
class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    // Load the tilemap JSON and the tileset image
    this.load.image("tiles", "../Assets/Images/Wall.png"); 
    this.load.tilemapTiledJSON('dungeonMap', "../Dungeon.json");
  }

  create() {
    // Create the tilemap using the key from preload
    const map = this.make.tilemap({ key: "dungeonMap" });

    // Add the tileset image to the map
    const tileset = map.addTilesetImage("Wall", "tiles"); 

    // Create the layer from the map and the tileset
    const layer = map.createLayer("Tiles", tileset, 0, 0);
  }

  update() {
    // Your update logic here
  }
}

// Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  scene: SceneMain,
};

// Create the Phaser game
const game = new Phaser.Game(config);

export default SceneMain;
