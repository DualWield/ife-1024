'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var PlaneManger = require('PlaneManger');
    var BulletManger = require('BulletManger');
    var EnemyManger = require('EnemyManger');

    return (function () {
        function Entities() {
            _classCallCheck(this, Entities);

            var plane = this.planeManger = new PlaneManger(this);
            var bullet = this.bulletManger = new BulletManger(this);
            var enemy = this.enemyManger = new EnemyManger(this);

            this.entities = [plane, bullet, enemy];
        }

        _createClass(Entities, [{
            key: 'update',
            value: function update() {
                // bullet
                this.bulletManger.update();

                // plane
                this.planeManger.update();

                // enemy
            }
        }, {
            key: 'render',
            value: function render() {
                // clear the canvas
                planeCanvas.width = planeCanvas.width;
                // bullet
                this.bulletManger.render();
                // plane
                this.planeManger.render();
            }
        }]);

        return Entities;
    })();
});