import MainScene from "./MainScene.js";

const storedCharacters = JSON.parse(localStorage.getItem("characters"));
const selectedCharacters = storedCharacters?.selectedCharacters;

const char1 = selectedCharacters?.char1 || "player1";
const char2 = selectedCharacters?.char2 || "player2";

const config = {
  width: 1536,
  height: 738,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "game",
  scene: [new MainScene(60, 320, 90, 320, char1, char2)],
  scale: {
    zoom: 2,
  },
  physics: {
    default: "matter",
    matter: {
      debug: false,
      gravity: { y: 4 },
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
