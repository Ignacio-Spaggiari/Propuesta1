export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  preload() {
    // fondo
    this.load.image(
      "sky",
      "./public/assets/space3.png"
    );

    // jugador
    this.load.image(
      "player",
      "./public/assets/phaser3-logo.png"
    );

    // figura buena
    this.load.image(
      "figure",
      "./public/assets/particles/red.png"
    );

    // figura mala
    this.load.image(
      "badFigure",
      "./public/assets/particles/red.png"
    );
  }

  create() {
    // fondo
    this.add.image(400, 300, "sky");

    // =========================
    // PLATAFORMAS
    // =========================

    // array de plataformas
    this.platforms = [];

    // piso
    this.floor = this.add.rectangle(
      400,
      590,
      800,
      20,
      0x00ff00
    );

    this.physics.add.existing(this.floor, true);

    this.platforms.push(this.floor);

    // plataforma izquierda
    this.platform1 = this.add.rectangle(
      200,
      450,
      200,
      20,
      0x00ff00
    );

    this.physics.add.existing(this.platform1, true);

    this.platforms.push(this.platform1);

    // plataforma derecha
    this.platform2 = this.add.rectangle(
      600,
      350,
      200,
      20,
      0x00ff00
    );

    this.physics.add.existing(this.platform2, true);

    this.platforms.push(this.platform2);

    // plataforma central
    this.platform3 = this.add.rectangle(
      400,
      260,
      150,
      20,
      0x00ff00
    );

    this.physics.add.existing(this.platform3, true);

    this.platforms.push(this.platform3);

    // =========================
    // JUGADOR
    // =========================

    this.player = this.physics.add.image(
      400,
      500,
      "player"
    );

    this.player.setScale(0.2);

    this.player.setCollideWorldBounds(true);

    // colisión jugador-plataformas
    this.platforms.forEach((platform) => {
      this.physics.add.collider(
        this.player,
        platform
      );
    });

    // teclado
    this.cursors =
      this.input.keyboard.createCursorKeys();

    // =========================
    // GRUPOS
    // =========================

    this.figuras = this.physics.add.group();

    this.badFigures = this.physics.add.group();

    // =========================
    // COLISIONES FIGURAS
    // =========================

    this.platforms.forEach((platform) => {
      this.physics.add.collider(
        this.figuras,
        platform,
        this.reboteFigura,
        null,
        this
      );

      this.physics.add.collider(
        this.badFigures,
        platform,
        this.reboteFiguraMala,
        null,
        this
      );
    });

    // jugador vs figuras buenas
    this.physics.add.overlap(
      this.player,
      this.figuras,
      this.recolectarFigura,
      null,
      this
    );

    // jugador vs figuras malas
    this.physics.add.overlap(
      this.player,
      this.badFigures,
      this.recolectarFiguraMala,
      null,
      this
    );

    // =========================
    // PUNTAJE
    // =========================

    this.score = 0;

    this.scoreText = this.add.text(
      20,
      20,
      "Puntos: 0",
      {
        fontSize: "32px",
        fill: "#ffffff",
      }
    );

    // =========================
    // TIMER
    // =========================

    this.tiempoRestante = 30;

    this.timerText = this.add.text(
      550,
      20,
      "Tiempo: 30",
      {
        fontSize: "32px",
        fill: "#ffffff",
      }
    );

    // =========================
    // CREAR FIGURAS BUENAS
    // =========================

    this.time.addEvent({
      delay: 500,

      callback: this.crearFigura,

      callbackScope: this,

      loop: true,
    });

    // =========================
    // CREAR FIGURAS MALAS
    // =========================

    this.time.addEvent({
      delay: 1500,

      callback: this.crearFiguraMala,

      callbackScope: this,

      loop: true,
    });

    // =========================
    // TIMER
    // =========================

    this.time.addEvent({
      delay: 1000,

      callback: () => {
        this.tiempoRestante--;

        this.timerText.setText(
          "Tiempo: " + this.tiempoRestante
        );

        if (this.tiempoRestante <= 0) {
          this.perder();
        }
      },

      loop: true,
    });
  }

  // =========================
  // FIGURA BUENA
  // =========================

  crearFigura() {
    const x = Phaser.Math.Between(50, 750);

    const figura = this.figuras.create(
      x,
      50,
      "figure"
    );

    figura.setGravityY(300);

    figura.setBounce(0.8);

    figura.setCollideWorldBounds(true);

    figura.setScale(2);

    figura.points = Phaser.Math.Between(10, 30);
  }

  // =========================
  // FIGURA MALA
  // =========================

  crearFiguraMala() {
    const x = Phaser.Math.Between(50, 750);

    const figura = this.badFigures.create(
      x,
      50,
      "badFigure"
    );

    figura.setGravityY(300);

    figura.setBounce(0.8);

    figura.setCollideWorldBounds(true);

    figura.setScale(3);

    figura.setTint(0x00aaff);

    figura.points = 20;
  }

  // =========================
  // REBOTE BUENA
  // =========================

  reboteFigura(figura) {
    figura.points -= 5;

    if (figura.points <= 0) {
      figura.destroy();
    }
  }

  // =========================
  // REBOTE MALA
  // =========================

  reboteFiguraMala(figura) {
    figura.points -= 5;

    if (figura.points <= 0) {
      figura.destroy();
    }
  }

  // =========================
  // RECOLECTAR BUENA
  // =========================

  recolectarFigura(player, figura) {
    this.score += figura.points;

    this.scoreText.setText(
      "Puntos: " + this.score
    );

    figura.destroy();

    if (this.score >= 100) {
      this.ganar();
    }
  }

  // =========================
  // RECOLECTAR MALA
  // =========================

  recolectarFiguraMala(player, figura) {
    this.score -= figura.points;

    if (this.score < 0) {
      this.score = 0;
    }

    this.scoreText.setText(
      "Puntos: " + this.score
    );

    figura.destroy();
  }

  // =========================
  // GANAR
  // =========================

 ganar() {
  this.scene.start("game-over", {
    resultado: "ganaste",
    score: this.score,
  });
}

  // =========================
  // PERDER
  // =========================

  perder() {
  this.scene.start("game-over", {
    resultado: "perdiste",
    score: this.score,
  });
}

  update() {
    this.player.setVelocity(0);

    // izquierda
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    }

    // derecha
    if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    }

    // arriba
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-300);
    }

    // abajo
    if (this.cursors.down.isDown) {
      this.player.setVelocityY(300);
    }
  }
}