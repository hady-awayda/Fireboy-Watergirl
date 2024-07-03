import MainScene from "./MainScene.js";

const storedCharacters = JSON.parse(localStorage.getItem("characters"));
const selectedCharacters = storedCharacters?.selectedCharacters;

const char1 = selectedCharacters?.char1 || "player1";
const char2 = selectedCharacters?.char2 || "player2";

const config = {
  width: 2800,
  height: 1000,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "game",
  scene: [new MainScene(2100, 420, 200, 250, char1, char2)],
  scale: {
    zoom: 0.6,
  },
  physics: {
    default: "matter",
    arcade: {
      debug: true,
    },
    matter: {
      debug: true,
      gravity: { y: 15 },
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
