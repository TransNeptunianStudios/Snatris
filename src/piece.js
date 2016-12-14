import Phaser from 'phaser'

export default class extends Phaser.Graphics {

    constructor (game, x, y, points) {
        super(game, x, y)

        this.game = game

        this.start = points[0];
        this.end = points[points.length-1];

        this.lineStyle(2, 0xFFFFFF);
        var oldPos = new Phaser.Point(0, 0)
        for (var i = 0; i < points.length; i++) {
          this.lineTo(oldPos.x + points[i].x, oldPos.y + points[i].y);
          oldPos.x += points[i].x;
          oldPos.y += points[i].y;
        }
    }

    update () {
      this.angle++;
    }

}
