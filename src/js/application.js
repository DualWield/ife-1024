requirejs.config({
    baseUrl: 'dist/js'
});

window.planeCanvas = document.getElementById('plane-game');

let ua = navigator.userAgent.toLowerCase();
let android = ua.indexOf('android') > -1 ? true : false;
let ios = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1) ? true : false;
if(android || ios) {
    window.WIDTH = window.innerWidth;
    window.HEIGHT = window.innerHeight;
}else {
    window.WIDTH = 600;
    window.HEIGHT = 800;
}



define(function (require) {
    var InputManager = require('InputManager');
    var GameManager = require('GameManager');

    // Wait till the browser is ready to render the game (avoids glitches)
    window.requestAnimationFrame(
        () => window.game = new GameManager(InputManager)
    );

});
