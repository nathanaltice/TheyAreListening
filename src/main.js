class Listeners extends Phaser.Scene {
    constructor() {
        super("listenersScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('arrow', 'arrowKey.png');
        this.load.image('tile', 'tile.png');
    }

    create() {
        this.add.sprite(50, 50, 'arrow');

        this.add.sprite(400, 400, 'tile');
    }
}

// game object configuration
let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: [ Listeners ],
};

let game = new Phaser.Game(config);