'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var thumbImg = document.createElement('img');
    thumbImg.src = 'dist/img/plane.png';
    var Draw = require('Draw');
    return (function () {
        function Plane() {
            _classCallCheck(this, Plane);

            this.x = 50;
            this.y = 50;
            this.r = 40;
        }

        _createClass(Plane, [{
            key: 'updatePosition',
            value: function updatePosition(x, y) {
                this.x = x;
                this.y = y;
            }
        }, {
            key: 'update',
            value: function update(x, y) {
                var r = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];
            }
        }, {
            key: 'render',
            value: function render() {
                var x = this.x,
                    y = this.y,
                    r = this.r;
                var ctx = planeCanvas.getContext('2d');
                ctx.save();
                ctx.beginPath();
                ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(thumbImg, 0, 0, thumbImg.width, thumbImg.width, x + 5 - r, y + 5 - r, r * 2, r * 2);
                ctx.restore();
            }
        }]);

        return Plane;
    })();
});