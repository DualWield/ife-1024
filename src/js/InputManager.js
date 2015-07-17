define(function (require) {
    let Draw = require('Draw');

    class InputManager {
        constructor() {
            this.events = {};
            this.listen();
        }

        on(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        }

        emit(event, data) {
            var callbacks = this.events[event];
            if (callbacks) {
                callbacks.forEach(function (callback) {
                    callback(data);
                });
            }
        }

        listen() {
            var gameContainer = document.getElementById('plane-game');
            this.ctx = gameContainer.getContext('2d');
            gameContainer.addEventListener('touchstart', (event) => {
                if ((event.touches.length > 1) ||
                    event.targetTouches > 1) {
                    return; // Ignore if touching with more than 1 finger
                }
                var x = (event.touches[0].clientX - $(gameContainer).offset().left) / game.scale;
                var y = (event.touches[0].clientY - $(gameContainer).offset().top) / game.scale;

                this.touchStart(x, y);

            });
            gameContainer.addEventListener('touchmove', (event) => {
                var x = (event.touches[0].clientX - $(gameContainer).offset().left) / game.scale;
                var y = (event.touches[0].clientY - $(gameContainer).offset().top) / game.scale;

                this.touchMove(x, y);

                event.preventDefault();

            });
            gameContainer.addEventListener('touchend', (event) => {
                event.preventDefault();
            });

            gameContainer.addEventListener('mouseenter', (event) => {
                var x = (event.clientX - $(gameContainer).offset().left) / game.scale;
                var y = (event.clientY - $(gameContainer).offset().top) / game.scale;
                this.touchStart(x, y);
            });
            gameContainer.addEventListener('mousemove', (event) => {
                var x = (event.clientX - $(gameContainer).offset().left) / game.scale;
                var y = (event.clientY - $(gameContainer).offset().top) / game.scale;
                this.touchMove(x, y);
            });
            gameContainer.addEventListener('mousemove', (event) => {
                event.preventDefault();
            });
        }

        touchStart(x, y) {
            //Draw.drawPlane(this.ctx, x, y);
            this.emit('onchangePlane', {x: x, y: y});
        }

        touchMove(x, y) {
            this.emit('onchangePlane', {x: x, y: y});

        }

    }


    return InputManager;
});