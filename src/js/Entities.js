define(function (require) {
    var Plane = require('Plane');
    var Bullet = require('Bullet');

    return class Entities {
        constructor () {
            this.plane = new Plane();
            this.bullets = [];

            this.bulletSpeed = 5;
            this.bulletInterval = this.bulletSpeed;
        }

        update () {
            this.bulletInterval--;
            if(this.bulletInterval < 0) {
                this.bullets.push(new Bullet({
                    x: this.plane.x + 5,
                    y: this.plane.y - 20
                }));
                this.bulletInterval = this.bulletSpeed;
            }
            let newBullets = [];
            this.bullets.forEach(function (bullet) {
                if( bullet.x > WIDTH || bullet.x < 0 ||
                    bullet.y > HEIGHT || bullet.y < 0){

                }else {
                    newBullets.push(bullet);
                    bullet.update();
                }

            });
            this.bullets = newBullets;
            this.plane.update();

        }

        render () {
            planeCanvas.width = planeCanvas.width;
            this.plane.render();
            this.bullets.forEach(function (bullet) {
                bullet.render();
            })
        }
    }
});