/* globals __DEV__ */
import Phaser from 'phaser'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    console.log("GameOverMenu create");
    this.game.input.onDown.addOnce(this.ToMainMenu, this);
    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(this.ToMainMenu, this);
  }

  update() {
  }

  ToMainMenu() {
      this.state.start('MainMenu');
  }

  render () {
    if (__DEV__) {
      game.debug.cameraInfo(game.camera, 32, 32);
    }
  }
}
