/* globals __DEV__ */
import Phaser from 'phaser'
import Piece from '../piece'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create (){
    var startPoint = new Phaser.Point(this.game.world.centerX, 400);
    var currentPiece = new Piece(this.game, startPoint.x, startPoint.y, [new Phaser.Point(0, -100), new Phaser.Point(100, 0), new Phaser.Point(0, -100)]);
    this.game.add.existing(currentPiece);
  }

  update (){

  }
}
