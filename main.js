import HelloWorldScene from "./scenes/HelloWorldScene.js";
import GameOverScene from "./scenes/GameOverScene.js";

const config = {
  type: Phaser.AUTO,

  width: 800,
  height: 600,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  physics: {
    default: "arcade",

    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  // escenas
  scene: [HelloWorldScene, GameOverScene],
};

window.game = new Phaser.Game(config);