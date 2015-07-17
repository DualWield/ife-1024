'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

define(function (require) {
    var Draw = require('Draw');

    var InputManager = (function () {
        function InputManager() {
            _classCallCheck(this, InputManager);

            this.events = {};
            this.listen();
        }

        _createClass(InputManager, [{
            key: 'on',
            value: function on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
            }
        }, {
            key: 'emit',
            value: function emit(event, data) {
                var callbacks = this.events[event];
                if (callbacks) {
                    callbacks.forEach(function (callback) {
                        callback(data);
                    });
                }
            }
        }, {
            key: 'listen',
            value: function listen() {
                var _this = this;

                var gameContainer = document.getElementById('plane-game');
                var gameContainerContainer = document.getElementById('game');
                this.ctx = gameContainer.getContext('2d');
                gameContainer.addEventListener('touchstart', function (event) {
                    if (event.touches.length > 1 || event.targetTouches > 1) {
                        return; // Ignore if touching with more than 1 finger
                    }
                });
                gameContainer.addEventListener('mouseenter', function (event) {
                    var x = (event.clientX - gameContainer.offsetLeft - gameContainerContainer.offsetLeft) / game.scale;
                    var y = (event.clientY - gameContainer.offsetTop - gameContainerContainer.offsetTop) / game.scale;
                    _this.touchStart(x, y);
                });
                gameContainer.addEventListener('mousemove', function (event) {
                    var x = (event.clientX - gameContainer.offsetLeft - gameContainerContainer.offsetLeft) / game.scale;
                    var y = (event.clientY - gameContainer.offsetTop - gameContainerContainer.offsetTop) / game.scale;
                    _this.touchMove(x, y);
                });
                gameContainer.addEventListener('mousemove', function (event) {
                    event.preventDefault();
                });
            }
        }, {
            key: 'touchStart',
            value: function touchStart(x, y) {
                //Draw.drawPlane(this.ctx, x, y);
                this.emit('onchangePlane', { x: x, y: y });
            }
        }, {
            key: 'touchMove',
            value: function touchMove(x, y) {
                this.emit('onchangePlane', { x: x, y: y });
            }
        }]);

        return InputManager;
    })();

    return InputManager;
});