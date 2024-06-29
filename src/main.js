import Phaser from "./utils/phaser.js";

// Define the SceneMain class
class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {
    this.load.image("Dungeon", "/assets/images/dungeon.png");
  }

  create() {
    const array = [
      [0, 1, 2],
      [0, 1, 2],
      [0, 1, 2],
    ];
    console.log("ds");
    const map = this.make.tilemap({
      data: array,
      tileWidth: 64,
      tileHeight: 64,
    });
    const tileset = map.addTilesetImage("tiles");
    const layer = map.createLayer(0, tileset, 0, 0);
    console.log("sdadsa");
  }

  update() {
    // Your update logic here
  }
}

// Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: SceneMain,
};

// Create the Phaser game
const game = new Phaser.Game(config);

export default SceneMain;
