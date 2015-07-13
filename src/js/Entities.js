define(function (require) {
    var Plane = require('Plane');

    return class Entities {
        constructor () {
            this.plane = new Plane();

        }

        update () {
            this.plane.update();
        }

        render () {
            planeCanvas.width = planeCanvas.width;
            this.plane.render();
        }
    }
});