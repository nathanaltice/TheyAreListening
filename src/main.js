// Nathan Altice
// Updated: 7/1/20
// They Are Listening
// Phaser 3 input listener examples

class Listeners extends Phaser.Scene {
    constructor() {
        super("listenersScene");
    }

    preload() {
        // load assets
        this.load.path = "assets/";
        this.load.image('arrow', 'arrowKey.png');
        this.load.image('block', 'tile.png');
        this.load.image('ball', '8ball.png');
    }

    create() {
        // initialize message for text display
        this.message = this.add.text(game.config.width/2, 750, 'Awaiting Event...').setOrigin(0.5);

        // set up some interactive objects
        this.block = this.add.sprite(400, 400, 'block');
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.GameObject.html#setInteractive
        this.block.setInteractive({
            draggable: false,
            useHandCursor: false
        });

        this.ball = this.add.sprite(100, 300, 'ball');
        this.ball.setInteractive({
            draggable: false,
            useHandCursor: false,
            dropZone: true
        });

        this.arrow = this.add.sprite(50, 50, 'arrow');
        this.arrow.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        // set up some listeners (by type)
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Input.Events.html

        // Input Plugin (Scene)
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            console.log(pointer);
            console.log(gameObject);
            console.log(event);
            this.printMessage(`Pointer clicked on '${gameObject.texture.key}'`);
        });
        // pointer leaves game canvas
        this.input.on('gameout', (time, event) => {
            this.printMessage(`Pointer abandoned game at ~${Math.floor(time/1000)}s`);
        });
        // pointer returns to game canvas (after leaving)
        this.input.on('gameover', (time, event) => {
            this.printMessage(`Pointer came back at ~${Math.floor(time/1000)}s`);
        });

        // Game Object listeners
        // drag specific object...
        this.arrow.on('drag', (pointer, dragX, dragY) => {
            this.arrow.x = dragX;
            this.arrow.y = dragY;
            this.printMessage(`Dragging ${this.arrow.texture.key}...`);
        });
        // let go of dragged object
        // note: dragX, dragY don't report world coordinates like they are supposed to (it seems they report internal object coordinates instead)
        this.arrow.on('dragend', (pointer, dragX, dragY) => {
            this.printMessage(`Dragged '${this.arrow.texture.key}' to coordinates ${pointer.x},${pointer.y}`);
            //console.log(pointer);
        });
        // drop object on dropZone target
        this.arrow.on('drop', (pointer, target) => {
            // note: the message below will be superseded by the dragend event above
            console.log(`Dropped '${this.arrow.texture.key}' on '${target.texture.key}'`);
            this.printMessage(`Dropped '${this.arrow.texture.key}' on '${target.texture.key}'`);
        });
    }

    printMessage(msg) {
        this.message.text = msg;
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