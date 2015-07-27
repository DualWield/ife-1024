define(function (require) {
    var PlaneManger = require('PlaneManger');
    var BulletManger = require('BulletManger');
    var EnemyManger = require('EnemyManger');


    return class Entities {
        constructor () {
            var plane = this.planeManger = new PlaneManger(this);
            var bullet = this.bulletManger = new BulletManger(this);
            var enemy = this.enemyManger = new EnemyManger(this);

            this.entities = [plane, bullet, enemy];
        }

        update () {
            // bullet
            this.bulletManger.update();

            // plane
            this.planeManger.update();

            // enemy
            this.enemyManger.update();

            // check collides
            this.checkCollides();

        }
        checkCollides () {
            this.bulletManger.bullets.forEach( (bullet) => {
                this.enemyManger.enemies.forEach( (enemy) => {
                    if (this.checkBulletAndEnemy(bullet, enemy)) {
                        bullet.remove = true;
                        enemy.remove = true;
                    }
                })
            })
        }

        checkBulletAndEnemy (bullet, enemy) {
            let x = bullet.x;
            let y = bullet.y - bullet.h / 2;
            if(x > enemy.x - enemy.w/2 &&
                x < enemy.x + enemy.w/2 &&
                y < enemy.y + enemy.h/2 &&
                y > enemy.y - enemy.h/2) {
                return true;
            }else {
                return false;
            }

        }
        render () {
            // clear the canvas
            planeCanvas.width = planeCanvas.width;
            // bullet
            this.bulletManger.render();
            // plane
            this.planeManger.render();
            // enemy
            this.enemyManger.render();
        }
    }
});