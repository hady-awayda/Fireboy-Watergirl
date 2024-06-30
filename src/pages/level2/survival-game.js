import PhaserMatterCollisionPlugin from "https://cdn.jsdelivr.net/npm/phaser-matter-collision-plugin@2.0.0/dist/phaser-matter-collision-plugin.min.js";

const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "survival-game",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};

const game = new Phaser.Game(config);

function preload() {
  // Load assets here
}

function create() {
  // Initialize game objects here
}

function update(time, delta) {
  // Update game objects here
}
