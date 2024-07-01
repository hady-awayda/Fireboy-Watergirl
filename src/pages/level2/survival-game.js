class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("box", '../../assets/images/Mine.gif"');
  }

  create() {
    // Add a static ground
    this.matter.add.rectangle(256, 500, 512, 50, { isStatic: true });

    // Add a box to the scene
    this.box = this.matter.add.image(256, 100, "box");
    this.box.setBounce(0.5);

    // Set up collision detection
    this.matterCollision.addOnCollideStart({
      objectA: this.box,
      callback: (data) => {
        console.log("Collision detected!");
      },
    });

    // Debug output
    console.log("Matter.Collision:", this.matterCollision);
  }

  update() {
    // Game logic
  }
}

const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "survival-game",
  scene: MainScene,
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

export default MainScene;
