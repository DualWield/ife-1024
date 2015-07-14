define(function (require) {

    return class Bullet {
        constructor (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.remove = false;

            this.speed = 10;

        }

        update () {
            this.y = this.y - this.speed;
        }

        render () {
            this.drawBullet(this.x ,this.y);
        }

        drawBullet (x, y, w=3, h=8) {
            let ctx = planeCanvas.getContext('2d');
            ctx.save();
            ctx.beginPath();
            ctx.rect(x - w/2, y - h/2, w, h);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.restore();
        }
    }
});