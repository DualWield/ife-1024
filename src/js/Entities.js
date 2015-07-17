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

        }

        render () {
            // clear the canvas
            planeCanvas.width = planeCanvas.width;
            // bullet
            this.bulletManger.render();
            // plane
            this.planeManger.render();

        }
    }
});