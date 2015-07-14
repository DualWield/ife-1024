'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var Plane = require('Plane');
    var Bullet = require('Bullet');

    return (function () {
        function Entities() {
            _classCallCheck(this, Entities);

            this.plane = new Plane();
            this.bullets = [];

            this.bulletSpeed = 5;
            this.bulletInterval = this.bulletSpeed;
        }

        _createClass(Entities, [{
            key: 'update',
            value: function update() {
                this.bulletInterval--;
                if (this.bulletInterval < 0) {
                    this.bullets.push(new Bullet({
                        x: this.plane.x + 5,
                        y: this.plane.y - 20
                    }));
                    this.bulletInterval = this.bulletSpeed;
                }
                var newBullets = [];
                this.bullets.forEach(function (bullet) {
                    if (bullet.x > WIDTH || bullet.x < 0 || bullet.y > HEIGHT || bullet.y < 0) {} else {
                        newBullets.push(bullet);
                        bullet.update();
                    }
                });
                this.bullets = newBullets;
                this.plane.update();
            }
        }, {
            key: 'render',
            value: function render() {
                planeCanvas.width = planeCanvas.width;
                this.plane.render();
                this.bullets.forEach(function (bullet) {
                    bullet.render();
                });
            }
        }]);

        return Entities;
    })();
});