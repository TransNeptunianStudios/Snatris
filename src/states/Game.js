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
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.TouchDown = false;

    this.titleText = this.game.add.text(this.game.world.width - 130, 20, "Score: 0", {
      font: "20px Arial",
      fill: "#FFFFFF",
      align: "left"
    });

    // SOUNDS
    this.confirmSounds = [game.add.audio('confirm1'), game.add.audio('confirm2'), game.add.audio('confirm3')]
    this.deathSound = game.add.audio('death')
    this.deathSound.volume = 0.5
    this.deathSound.onStop.add(function() {
          this.state.start('GameOver', false, false)
    }, this);

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

    var confirm = this.game.rnd.pick(this.confirmSounds)
    confirm.volume = 0.5;
    confirm.play()
  }

  update (){
    if(!this.snatris.alive && !this.deathSound.isPlaying )
      this.deathSound.play()

    // Cursors
    if (this.cursors.left.isDown || this.leftKey.isDown)
      this.rotatePreview(-4)
    else if (this.cursors.right.isDown || this.rightKey.isDown)
      this.rotatePreview(4)

    // TOUCH
    if(game.input.activePointer.isDown && !this.TouchDown){
      this.TouchDown = true;
    }
    else if(game.input.activePointer.isDown){
      var rot = game.input.speed.x + game.input.speed.y;
      this.rotatePreview(rot);
    }
    else if(this.TouchDown){
      this.confirmPlacement();
      this.TouchDown = false;
    }

    this.snatris.addLinks(this.previewPiece, true)
  }
}
