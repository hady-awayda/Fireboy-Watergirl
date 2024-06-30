const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "survival-game",
  scene: [],
  // {
  //   preload: preload,
  //   create: create,
  //   update: update,
  // },
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

new phaser.Game(config);
