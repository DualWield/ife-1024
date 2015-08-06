/**
 * Created by xuli on 2015/7/17.
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var bullet = require('Bullet');

    var BulletManger = (function () {
        function BulletManger(entities) {
            _classCallCheck(this, BulletManger);

            this.entities = entities;

            this.speed = 5;
            this.interval = 5;
            this.current = 0;
            this.bullets = [];
        }

        _createClass(BulletManger, [{
            key: 'update',
            value: function update() {
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
        }, {
            key: 'removeOlderBullets',
            value: function removeOlderBullets() {}
        }, {
            key: 'render',
            value: function render() {
                this.drawBullet(bullet.x, bullet.y);
            }
        }, {
            key: 'drawBullet',
            value: function drawBullet(x, y) {
                var w = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];
                var h = arguments.length <= 3 || arguments[3] === undefined ? 8 : arguments[3];

                var ctx = planeCanvas.getContext('2d');
                ctx.save();
                this.bullets.forEach(function (bullet) {
                    var x = bullet.x;
                    var y = bullet.y;

                    ctx.beginPath();
                    ctx.rect(x - w / 2, y - h / 2, w, h);
                    ctx.closePath();
                    ctx.fill();
                });
                ctx.fillStyle = 'red';
                ctx.restore();
            }
        }]);

        return BulletManger;
    })();

    return BulletManger;
});

/* this.bullets = this.bullets.filter(function (bullet) {
     if (bullet.x < WIDTH && bullet.x > 0 ||
         bullet.y < HEIGHT && bullet.y > 0) {
         return true;
     }
 });*/