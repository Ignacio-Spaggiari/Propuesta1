export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("game-over");
  }

  init(data) {
    // datos recibidos desde HelloWorldScene
    this.resultado = data.resultado;
    this.score = data.score;
  }

  create() {
    // fondo negro
    this.cameras.main.setBackgroundColor("#000000");

    // texto principal
    let mensaje = "";
    let color = "#ffffff";

    if (this.resultado === "ganaste") {
      mensaje = "GANASTE";
      color = "#00ff00";
    } else {
      mensaje = "PERDISTE";
      color = "#ff0000";
    }

    this.add.text(250, 180, mensaje, {
      fontSize: "64px",
      fill: color,
    });

    // puntaje final
    this.add.text(260, 300, "Puntaje: " + this.score, {
      fontSize: "40px",
      fill: "#ffffff",
    });

    // reiniciar
    this.add.text(180, 420, "Presiona ESPACIO para reiniciar", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    // tecla espacio
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    // reiniciar juego
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.scene.start("hello-world");
    }
  }
}