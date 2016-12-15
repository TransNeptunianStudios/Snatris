/* globals __DEV__ */
import Phaser from 'phaser'
import Snatris from '../snatris'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create (){
    var startPoint = new Phaser.Point(this.game.world.centerX, 400)
    this.snatris = new Snatris(this.game, startPoint.x, startPoint.y)
    this.game.add.existing(this.snatris)

    this.confirmButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.confirmButton.onDown.add(this.confirmPlacement, this)
    this.cursors = game.input.keyboard.createCursorKeys()

    this.pieces = [ [new Phaser.Point(0, -50)],
                    [new Phaser.Point(0, -50), new Phaser.Point(50, 0)],
                    [new Phaser.Point(0, -50), new Phaser.Point(-50, 0)],
                    [new Phaser.Point(0, -50), new Phaser.Point(-50, 0), new Phaser.Point(0, 50)],
                    [new Phaser.Point(0, -50), new Phaser.Point(50, 0), new Phaser.Point(0, 50)]]
    this.previewPiece = [new Phaser.Point(0, -50)]
    this.currentAngle = 0
    this.snatris.addLinks(this.previewPiece, true)
  }
  rotatePreview (angle) {
    var theta = Phaser.Math.degToRad(this.currentAngle-angle);

    var cs = Math.cos(theta);
    var sn = Math.sin(theta);

    for (var i = 0; i < this.previewPiece.length; i++) {
      var px = this.previewPiece[i].x * cs - this.previewPiece[i].y * sn
      var py = this.previewPiece[i].x * sn + this.previewPiece[i].y * cs

      this.previewPiece[i].x = px;
      this.previewPiece[i].y = py;
    }

    this.currentAngle = angle%360
  }

  confirmPlacement() {
    this.snatris.addLinks(this.previewPiece)
    this.previewPiece = this.game.rnd.pick(this.pieces);
    this.oldRotation = this.currentAngle;
    this.currentAngle = 0
    this.rotatePreview(this.oldRotation);
    this.snatris.addLinks(this.previewPiece, true)
  }

  update (){
      if(!this.snatris.alive)
        this.state.start('GameOver', false, false)

    if (this.cursors.left.isDown)
      this.rotatePreview(this.currentAngle+3)
    else if (this.cursors.right.isDown)
      this.rotatePreview(this.currentAngle-3)

    this.snatris.addLinks(this.previewPiece, true)

  }


}
