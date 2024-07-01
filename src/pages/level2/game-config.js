import MainScene from "./MainScene.js";

const char1 = localStorage.getItem("char1") || "player1";
const char2 = localStorage.getItem("char2") || "player2";

const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "game",
  scene: [new MainScene(200, 200, 300, 200, char1, char2)],
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
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
