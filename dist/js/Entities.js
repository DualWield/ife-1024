'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var Plane = require('Plane');

    return (function () {
        function Entities() {
            _classCallCheck(this, Entities);

            this.plane = new Plane();
        }

        _createClass(Entities, [{
            key: 'update',
            value: function update() {
                this.plane.update();
            }
        }, {
            key: 'render',
            value: function render() {
                planeCanvas.width = planeCanvas.width;
                this.plane.render();
            }
        }]);

        return Entities;
    })();
});