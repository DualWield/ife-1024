define(function (require) {
    let thumbImg = document.createElement('img');
    thumbImg.src = 'dist/img/enemy-small.png';
    class EnemyManger {
        constructor(entities) {
            this.entities = entities;

            this.speed = 5;
            this.interval = 80;

            this.current = 0;
            this.enemies = [];

        }

        update() {
            this.current++;
            if (this.current > this.interval) {
                this.enemies.push(new Enemy({
                    x: WIDTH * Math.random(),
                    y: -5
                }));
                this.current = 0;
            }
            // 将无用的enemy移除数组
            this.removeOlderEnemies();
            this.enemies.forEach(function (enemy) {
                enemy.update();
            });

        }
        removeOlderEnemies () {
            this.enemies = this.enemies.filter(function (enemy) {
                if (enemy.x < WIDTH && enemy.x > -100 &&
                    enemy.y < HEIGHT && enemy.y > -100 && !enemy.remove) {
                    return true;
                }
            });
        }
        render() {
            this.drawEnemy();
        }
        drawEnemy(w = 3, h = 8) {
           this.enemies.forEach((enemy) => {
               enemy.render();
           })
        }
    }


    class Enemy {
        constructor (obj){
            this.level = obj.level || 2;
            this.x = obj.x;
            this.y = obj.y;
            this.w = 50;
            this.h = 50;
            this.remove = false;
            this.xConstant = obj.x;
            this.speed = 5;
            this.interval = 5;
            this.current = 0;
        }
        update () {
            if(this.level === 1) {
                this.y += this.speed;
            }else if(this.level === 2) {
                this.current ++;
                if(this.current > this.interval) {
                    let time = new Date().getTime() * (0.003 + 0.002);
                    this.x = this.xConstant + Math.sin(time)*80;
                    this.y += this.speed;
                    this.current = 0;
                }

            }


        }
        render () {
            let ctx = planeCanvas.getContext('2d');
            let {x, y, w, h} = this;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x - w/2, y - h/2, w, h);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(thumbImg, 0, 0, thumbImg.width, thumbImg.width, x + 5 - w/2, y + 5 - h/2, w, h);
            ctx.restore();
        }
    }
    return EnemyManger;
});