/* globals __DEV__ */
import Phaser from 'phaser'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    console.log("MainMenu create");
    this.game.world.setBounds(0, 0, 960, 1080);
    this.game.camera.setPosition(0, 540);
    this.game.add.sprite(0, 0, 'background');

    this.titleText = this.game.add.text(this.game.world.centerX, 700, "The\n Snatris \n Constellation", {
      font: "65px Arial",
      fill: "#FFFFFF",
      align: "center"
    });
    this.titleText.anchor.set(0.5);

    this.startText = this.game.add.text(this.game.world.centerX, 950, "<press to start>", {
      font: "25px Arial",
      fill: "#FFFFFF"
    });
    this.startText.anchor.set(0.5);

    this.authorText = this.game.add.text(5, this.game.world.height - 15, "by Robin Reicher", {
      font: "10px Arial",
      fill: "#FFFFFF"
    });
    this.authorText.anchor.set(0, 0);

    this.versionText = this.game.add.text(this.game.world.width - 5, this.game.world.height - 15, "v. 0.1", {
      font: "10px Arial",
      fill: "#FFFFFF"
    });
    this.versionText.anchor.set(1, 0);

    this.game.input.onDown.addOnce(this.startGame, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.startGame, this);
  }

  update() {
  }

  startGame() {
      this.toBoard = this.game.add.tween(this.camera).to( { y: 0 }, 400, Phaser.Easing.Quadratic.InOut, true, 200);
      this.toBoard.onComplete.addOnce(function() {
        this.state.start('Game', false, false)
        this.titleText.alpha = 0;
        this.startText.alpha = 0;
      }, this);
  }

  render () {
  }
}
