import MainScene from "./MainScene.js";

const storedCharacters = JSON.parse(localStorage.getItem("characters"));
const selectedCharacters = storedCharacters.selectedCharacters;

const char1 = selectedCharacters.char1 || "player1";
const char2 = selectedCharacters.char2 || "player2";

const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "game",
  scene: [new MainScene(200, 200, 300, 200, char1, char2)],
  scale: {
    zoom: 1,
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