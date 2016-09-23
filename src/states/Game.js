/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  buildGrid() {
    this.graphics = this.game.add.graphics(0, 0);
    this.graphics.lineStyle(2, 0xFFFFFF, 0.15);

    var margin = 30;
    var size = 20;

    var width = this.game.width - (margin * 2);
    var cellSize = width / size;
    var maxHeight = this.game.height - (margin * 2);
    var yCells = Math.floor(maxHeight / cellSize);
    var height = yCells * cellSize;

    for (var x = 0; x <= width; x += cellSize){
      this.graphics.moveTo(margin + x, margin);
      this.graphics.lineTo(margin + x, margin + height);
    }

    for (var y = 0; y <= height; y += cellSize){
      this.graphics.moveTo(margin, margin + y);
      this.graphics.lineTo(margin + width, margin + y );
    }

    //beutiful
  }

  create () {
    this.buildGrid();

  }

  update () {

  }

  render () {

    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
      //this.game.debug.lineInfo(line1, 32, 32);
    }
  }
}
