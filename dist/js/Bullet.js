'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {

    return (function () {
        function Bullet(obj) {
            _classCallCheck(this, Bullet);

            this.x = obj.x;
            this.y = obj.y;
            this.remove = false;

            this.speed = 10;
        }

        _createClass(Bullet, [{
            key: 'update',
            value: function update() {
                this.y = this.y - this.speed;
            }
        }, {
            key: 'render',
            value: function render() {
                this.drawBullet(this.x, this.y);
            }
        }, {
            key: 'drawBullet',
            value: function drawBullet(x, y) {
                var w = arguments.length <= 2 || arguments[2] === undefined ? 3 : arguments[2];
                var h = arguments.length <= 3 || arguments[3] === undefined ? 8 : arguments[3];

                var ctx = planeCanvas.getContext('2d');
                ctx.save();
                ctx.beginPath();
                ctx.rect(x - w / 2, y - h / 2, w, h);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.restore();
            }
        }]);

        return Bullet;
    })();
});