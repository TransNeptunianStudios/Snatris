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

    // keyboard
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(this.confirmPlacement, this)
    this.cursors = game.input.keyboard.createCursorKeys()

    this.TouchDown = false;

    this.titleText = this.game.add.text(this.game.world.width - 130, 20, "Score: 0", {
      font: "20px Arial",
      fill: "#FFFFFF",
      align: "left"
    });

    this.confirmSound = game.add.audio('confirm')
    this.confirmSound.volume = 0.5

    this.pieces = [ [new Phaser.Point(0, -50)],
                    [new Phaser.Point(0, -100)],
                    [new Phaser.Point(0, -50), new Phaser.Point(50, 0)],
                    [new Phaser.Point(0, -50), new Phaser.Point(-50, 0)],
                    [new Phaser.Point(0, -50), new Phaser.Point(-50, 0), new Phaser.Point(0, 50)],
                    [new Phaser.Point(0, -50), new Phaser.Point(50, 0), new Phaser.Point(0, 50)],
                    [new Phaser.Point(50, 0), new Phaser.Point(-50, -50), new Phaser.Point(50, 0)],
                    [new Phaser.Point(-50, 0), new Phaser.Point(50, -50), new Phaser.Point(-50, 0)]]
    this.previewPiece = [new Phaser.Point(0, -50)]
    this.snatris.addLinks(this.previewPiece, true)
  }
  rotatePreview (angle) {
    var theta = Phaser.Math.degToRad(angle);

    var cs = Math.cos(theta);
    var sn = Math.sin(theta);

    for (var i = 0; i < this.previewPiece.length; i++) {
      var px = this.previewPiece[i].x * cs - this.previewPiece[i].y * sn
      var py = this.previewPiece[i].x * sn + this.previewPiece[i].y * cs

      this.previewPiece[i].x = px;
      this.previewPiece[i].y = py;
    }
  }


  confirmPlacement() {
    this.snatris.addLinks(this.previewPiece)
    this.previewPiece = this.game.rnd.pick(this.pieces)
    this.rotatePreview (this.game.rnd.integer()%360)
    this.snatris.addLinks(this.previewPiece, true)
    this.confirmSound.play()
  }

  update (){
    if(!this.snatris.alive)
      this.state.start('GameOver', false, false)

    // Cursors
    if (this.cursors.left.isDown)
      this.rotatePreview(-4)
    else if (this.cursors.right.isDown)
      this.rotatePreview(4)

    // TOUCH
    if(game.input.activePointer.isDown && !this.TouchDown){
      this.TouchDown = true;
      console.log("First down")
    }
    else if(game.input.activePointer.isDown){
      var rot = game.input.speed.x + game.input.speed.y;
      console.log(rot)
      this.rotatePreview(rot);
    }
    else if(this.TouchDown){ // just released
      this.confirmPlacement();
      this.TouchDown = false;
      console.log("Release")
    }

    this.snatris.addLinks(this.previewPiece, true)
  }
}
