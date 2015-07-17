define(function (require) {
    let thumbImg = document.createElement('img');
    thumbImg.src = 'dist/img/plane.png';
    let Draw = require('Draw');
    return class Plane {
        constructor () {
            this.x = 50;
            this.y = 50;
            this.r = 40;
        }

        updatePosition (x, y) {
            this.x = x;
            this.y = y;
        }

        update (x, y, r = 10) {
        }

        render () {
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
});