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

    this.titleText = this.game.add.text(this.game.world.centerX, 950, "Start", {
      font: "35px Arial",
      fill: "#FFFFFF"
    });
    this.titleText.anchor.set(0.5);

    this.game.input.onDown.add(this.startGame, this);
  }

  update() {
  }

  startGame() {
    if(!this.toBoard){
      this.toBoard = this.game.add.tween(this.camera).to( { y: 0 }, 400, Phaser.Easing.Quadratic.InOut, true, 200);
      this.toBoard.onComplete.add(function() {this.state.start('Game', false, false)}, this );
    }
  }

  render () {
    if (__DEV__) {
      game.debug.cameraInfo(game.camera, 32, 32);
    }
  }
}
