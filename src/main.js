// Nathan Altice
// Updated: 4/20/23
// They Are Listening
// Phaser 3 input listener examples

// HALT! 🚨
'use strict';

class Listeners extends Phaser.Scene {
    constructor() {
        super('listenersScene');
    }

    /*  Image sources (Noun Project):
        - Trash by Alice Design (cc): https://thenounproject.com/search/?q=trash&i=2025402
        - burrito by J Ray Rivera (cc): https://thenounproject.com/search/?q=burrito&i=95674
        - Bird by tezar tantular (cc): https://thenounproject.com/search/?q=bird&i=3186323
        - Egg by Aficons (cc): https://thenounproject.com/search/?q=egg&i=2716340
        - Baseball by Kyle Dodson (cc): https://thenounproject.com/search/?q=baseball&i=1457343
        - Clown by DinosoftLab (cc): https://thenounproject.com/term/clown/1382945/
        - wand by Ricki Tri Putra (cc): https://thenounproject.com/search/?q=wand&i=2845164
    */
    preload() {
        // load assets
        this.load.path = 'assets/';
        this.load.image('baseball', 'baseball.png');
        this.load.image('bird', 'bird.png');
        this.load.image('burrito', 'burrito.png');
        this.load.image('trash', 'trash.png');
        this.load.image('wand', 'wand.png');
    }

    create() {
        // initialize message for text display
        this.message = this.add.text(width/2, 750, 'Awaiting Event...', { color: '#000' } ).setOrigin(0.5);

        this.cameras.main.setBackgroundColor('#FFF');

        // set up some interactive objects
        // see: https://newdocs.phaser.io/docs/3.60.0/Phaser.GameObjects.GameObject#setInteractive
        this.trash = this.add.sprite(100, 600, 'trash');
        this.trash.setInteractive({
            dropZone: true
        });
        
        this.bird = this.add.sprite(400, 400, 'bird');
        this.bird.setInteractive({
            dropZone: true
        });

        this.baseball = this.add.sprite(100, 300, 'baseball');
        this.baseball.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        this.wand = this.add.sprite(450, 600, 'wand');
        this.wand.setInteractive({
            cursor: 'url(./assets/clown.png), pointer'
        });

        this.burrito = this.add.sprite(450, 150, 'burrito');
        this.burrito.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        // set up some listeners (by type)
        // see: https://newdocs.phaser.io/docs/3.60.0/Phaser.Input.Events

        // Input Plugin (Scene)
        // click on a Game Object
        this.input.on('gameobjectdown', (pointer, gameObject, event) => {
            console.log(pointer);
            console.log(gameObject);
            console.log(event);
            this.printMessage(`Pointer clicked on '${gameObject.texture.key}' at ${pointer.x}, ${pointer.y}`);
        });
        // pointer leaves game canvas
        this.input.on('gameout', (time, event) => {
            this.printMessage(`Pointer abandoned game at approx. ${Math.floor(time/1000)}s`);
        });
        // pointer returns to game canvas (after leaving)
        this.input.on('gameover', (time, event) => {
            this.printMessage(`Pointer came back at approx. ${Math.floor(time/1000)}s`);
        });
        // pointer wheel moves
        this.input.on('wheel', (pointer, currentlyOver, deltaX, deltaY, deltaZ) => {
            this.printMessage(`Mouse wheel spin!`);
        });

        // Game Object listeners
        // drag specific objects...
        this.burrito.on('drag', (pointer, dragX, dragY) => {
            this.burrito.x = dragX;
            this.burrito.y = dragY;
            this.printMessage(`Dragging ${this.burrito.texture.key}...`);
        });
        this.baseball.on('drag', (pointer, dragX, dragY) => {
            this.baseball.x = dragX;
            this.baseball.y = dragY;
            this.printMessage(`Dragging ${this.baseball.texture.key}...`);
        });

        // let go of dragged object
        // note: dragX/Y report *where* you clicked on the object, relative to its origin
        this.burrito.on('dragend', (pointer, dragX, dragY) => {
            this.printMessage(`Dragged '${this.burrito.texture.key}' by [${dragX},${dragY}] to ${pointer.x},${pointer.y}`);
            //console.log(pointer);
        });
        // drop object on dropZone target
        this.burrito.on('drop', (pointer, target) => {
            // note: the message below will be superseded by the dragend event above
            console.log(`Dropped '${this.burrito.texture.key}' on '${target.texture.key}'`);
            this.printMessage(`Dropped '${this.burrito.texture.key}' on '${target.texture.key}'`);
            // put the burrito in the garbage
            if (target.texture.key === 'trash') {
                this.burrito.destroy();
            }
        });
    }

    printMessage(msg) {
        this.message.text = `${msg}`;
    }

    // Hey, check it out — with listener events we didn't need an update loop 💪
}

// game object configuration
let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: [ Listeners ],
};

let game = new Phaser.Game(config);
const { width, height } = game.config;