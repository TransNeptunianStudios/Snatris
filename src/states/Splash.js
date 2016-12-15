import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    //this.loaderBg =  this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    //this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    this.logo =      this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'TNSlogo');

    centerGameObjects([this.logo])
    //this.load.setPreloadSprite(this.loaderBar)
  }

  create () {
    console.log("Splash create");
    this.logo.alpha = 0;
    var fadeTween = this.game.add.tween(this.logo).to( { alpha: 1 }, 4000, Phaser.Easing.Linear.None, true, 1000);
    fadeTween.onComplete.addOnce(function() {this.state.start('MainMenu')}, this );

    this.game.input.onDown.addOnce(function() {this.state.start('MainMenu')}, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function() {this.state.start('MainMenu')}, this);
  }
}
