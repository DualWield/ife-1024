define(function (require) {
    let thumbImg = document.createElement('img');
    thumbImg.src = 'dist/img/enemy-small.png';
    class Enemy {
        constructor (obj) {
            this.x = obj.x;
            this.y = obj.y;

            this.speed = 10;
        }

        updatePosition (x, y) {
            this.x = x;
            this.y = y;
        }

        update () {
            this.x = this.x + Math.sin(new Date().getTime()) * 20;
            this.y = this.y + this.speed;
        }

        render () {
            this.drawEnemy();
        }

        drawEnemy () {
            let x = this.x, y = this.y, r = this.r;
            let ctx = planeCanvas.getContext('2d');
            //console.log(x, y);
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(thumbImg, 0, 0, thumbImg.width, thumbImg.width, x + 5 - r, y + 5 - r, r * 2, r * 2);
            ctx.restore();
        }
    }

    return Enemy;
});