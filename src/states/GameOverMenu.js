/* globals __DEV__ */
import Phaser from 'phaser'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    console.log("GameOverMenu create");

    var sorryText = this.game.add.text(this.game.world.centerX, 200, "Constellation complete", {
      font: "25px Arial",
      fill: "#FFFFFF"
    });
    sorryText.alpha = 0;
    sorryText.anchor.set(0.5);

    this.firstTween = game.add.tween(sorryText).to({ alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
    this.firstTween.onComplete.addOnce(()=>{
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.showScore, this);
      this.game.input.onDown.addOnce(this.showScore, this);
    }, this)
  }

  update() {
  }

  showScore() {
    var toScoreTween = this.game.add.tween(this.camera).to( { y: 540 }, 400, Phaser.Easing.Quadratic.InOut, true, 200);

    toScoreTween.onComplete.addOnce(()=>{
      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.toMainMenu, this);
      this.game.input.onDown.addOnce(this.toMainMenu, this);
    }, this)
  }

  toMainMenu() {
      this.state.start('MainMenu');
  }

  render () {
  }
}
