/**
 * Created by xuli on 2015/7/17.
 */
define(function (require) {
    var bullet = require('Bullet');
    class BulletManger {
        constructor(entities) {
            this.entities = entities;

            this.speed = 5;
            this.interval = 5;
            this.current = 0;
            this.bullets = [];

        }

        update() {
            this.current++;
            if (this.current > this.interval) {
                this.bullets.push(new bullet({
                    x: this.entities.planeManger.x,
                    y: this.entities.planeManger.y
                }));
                this.current = 0;
            }
            this.bullets.forEach(function (bullet) {
                bullet.update();
            });
            // 将无用的bullet移除数组
            this.removeOlderBullets();
        }

        removeOlderBullets() {
           /* this.bullets = this.bullets.filter(function (bullet) {
                if (bullet.x < WIDTH && bullet.x > 0 ||
                    bullet.y < HEIGHT && bullet.y > 0) {
                    return true;
                }
            });*/
        }

        render() {
            this.drawBullet(bullet.x, bullet.y);
        }

        drawBullet(x, y, w = 3, h = 8) {
            let ctx = planeCanvas.getContext('2d');
            ctx.save();
            this.bullets.forEach((bullet) => {
                let {x, y} = bullet;
                ctx.beginPath();
                ctx.rect(x - w / 2, y - h / 2, w, h);
                ctx.closePath();
                ctx.fill();
            });
            ctx.fillStyle = 'red';
            ctx.restore();
        }

    }
    return BulletManger;
});