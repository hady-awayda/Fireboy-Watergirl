// Define the StartScene class
class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });  // Set the scene's key to "StartScene"
  }

  preload() {
    // Load assets here if needed
  }

  create() {
    // Set up the scene elements here
    this.add.text(400, 300, 'Welcome to the Game!', {
      font: '32px Arial',
      fill: '#ffffff'
    }).setOrigin(0.5, 0.5);  // Add a text object to the scene for demonstration
  }

  update() {
    // Update logic goes here
  }
}

// Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  scene: StartScene,  // Correctly reference StartScene here
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
};

// Create the Phaser game
const game = new Phaser.Game(config);

export default StartScene;
