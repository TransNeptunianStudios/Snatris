/* globals __DEV__ */
import Phaser from 'phaser'
import {
    setResponsiveWidth
} from '../utils'

export default class extends Phaser.State {
    init() {}
    preload() {}

    create() {
        console.log("MainMenu create");
        this.game.camera.setPosition(0, 540);
        this.game.add.sprite(0, 0, 'background');

        this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.height * 0.7, 'title');

        this.startText = this.game.add.text(this.game.world.centerX, this.game.world.height * 0.965, "Press to start", {
            font: "20px Arial",
            fill: "#FFFFFF",
            alpha: 0
        });

        this.authorText = this.game.add.text(5, this.game.world.height - 15, "by Robin Reicher with art from Mikael Larsson & Johannes Carlsson", {
            font: "10px Arial",
            fill: "#FFFFFF"
        });

        this.versionText = this.game.add.text(this.game.world.width - 10, this.game.world.height - 15, "Version. 0.5", {
            font: "10px Arial",
            fill: "#FFFFFF"
        });
        this.versionText.anchor.set(1, 0);
        this.authorText.anchor.set(0, 0);
        this.startText.anchor.set(0.5);
        this.title.anchor.set(0.5);

        this.game.input.onDown.addOnce(this.startGame, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.startGame, this);
    }

    update() {}

    startGame() {
        this.toBoard = this.game.add.tween(this.camera).to({
            y: 0
        }, 400, Phaser.Easing.Quadratic.InOut, true, 200);
        this.toBoard.onComplete.addOnce(function() {
            this.state.start('Game', false, false)
            this.title.alpha = 0;
            this.startText.alpha = 0;
            this.versionText.alpha = 0;
            this.authorText.alpha = 0;
        }, this);
    }
}
