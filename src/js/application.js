requirejs.config({
    baseUrl: 'dist/js'
});

window.planeCanvas = document.getElementById('plane-game');

const WIDTH = 600;
const HEIGHT = 800;

define(function (require) {
    var InputManager = require('InputManager');
    var GameManager = require('GameManager');

    // Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(
        () => window.game = new GameManager(InputManager)
    );

});
