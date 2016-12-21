import Phaser from 'phaser'

export default class extends Phaser.Group {

    constructor (game, startX, startY) {
        super(game)

        this.game = game
        this.graphics = game.add.graphics(0, 0);
        this.alive = true;

        this.links = [new Phaser.Point(startX, startY)]
        this.nextLinks = []
        this.score = 0;
    }

    addLinks( relativeLinks, preview ) {
      if(!this.alive)
        return;

      this.nextLinks = [];
      for (var i = 0; i < relativeLinks.length; i++) {
        var head = this.nextLinks.length != 0 ? this.nextLinks[this.nextLinks.length-1] : this.links[this.links.length-1]

        if(preview)
          this.nextLinks.push(new Phaser.Point( head.x + relativeLinks[i].x, head.y + relativeLinks[i].y))
        else
          this.links.push(new Phaser.Point( head.x + relativeLinks[i].x, head.y + relativeLinks[i].y))
      }
    }

    snakeify () {
      if(this.links.length < 2) // Dont run when snatris is a dot
        return;


      if( Phaser.Point.distance(this.links[0], this.links[1], true) < 3) //Remove "dead" links
        this.links.shift();

      var speed = 1

      var tail = this.links[0]
      var dirTail = new Phaser.Point(tail.x - this.links[1].x, tail.y - this.links[1].y).normalize().multiply(speed, speed)
      tail.x -= dirTail.x
      tail.y -= dirTail.y

      var head = this.links[this.links.length-1]
      var dirHead = new Phaser.Point(this.links[this.links.length-2].x- head.x, this.links[this.links.length-2].y - head.y).normalize().multiply(speed*1.5, speed*1.5)
      head.x -= dirHead.x
      head.y -= dirHead.y
    }

    isColliding() {
      for (var i = 0; i < this.links.length-1; i++) {
        for (var j = 0; j < this.links.length-1; j++) {
           if(i == j)
            continue;

            var L1 = new Phaser.Line(this.links[i].x, this.links[i].y, this.links[i+1].x, this.links[i+1].y)
            var L2 = new Phaser.Line(this.links[j].x, this.links[j].y, this.links[j+1].x, this.links[j+1].y)
            var pointOfCollision = new Phaser.Point(0, 0);

            if( L1.intersects(L2, true, pointOfCollision)
                && Phaser.Point.distance(pointOfCollision, this.links[i], true) >= 2
                && Phaser.Point.distance(pointOfCollision, this.links[i+1], true) >= 2){
              return true;
            }
        }
      }
      return false;
    }

    isInside(x, y, w, h) {
      for (var i = 0; i < this.links.length; i++) {
        if(this.links[i].x < x || this.links[i].x > w || this.links[i].y < y || this.links[i].y > h)
          return false;
      }
      return true;
    }

    reDraw( withPreview ){
      var head = this.links[this.links.length-1]
      var tail = this.links[0]

      this.graphics.clear()
      this.graphics.moveTo(tail.x, tail.y)
      for (var i = 1; i < this.links.length; i++) {
        this.graphics.lineStyle(2, 0xFFFFFF);
        this.graphics.lineTo(this.links[i].x, this.links[i].y);
      }

      if( withPreview ){
        for (var i = 0; i < this.nextLinks.length; i++) {
          this.graphics.lineStyle(2, 0x3B9243);
          this.graphics.lineTo(this.nextLinks[i].x, this.nextLinks[i].y);
        }
      }
    }

    update () {
      if( !this.isColliding() && this.isInside(0,0, this.game.width, this.game.height)){
        this.snakeify()
        this.reDraw(true);

        this.score = this.links.length-1;
      }
      else{
        this.alive = false;
        this.reDraw(false);
      }
    }
}
