define(function (require) {

    return class Bullet {
        constructor (obj) {
            this.x = obj.x;
            this.y = obj.y;
            this.w = 3;
            this.h = 8;
            this.remove = false;

            this.speed = 50;

        }

        update () {
            this.y = this.y - this.speed;
        }

        render () {
            this.drawBullet(this.x ,this.y);
        }

        drawBullet (x, y) {
            let ctx = planeCanvas.getContext('2d');
            let {w, h} = this;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x - w/2, y - h/2, w, h);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.restore();
        }
    }
});