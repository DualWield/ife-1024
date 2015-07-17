define(function (require) {

    let Entities = require('Entities');

    class GameManager {
        constructor (InputManager) {
            this.inputManager = new InputManager;

            this.entities = new Entities();
            this.score = 0;
            this.canvas = document.getElementById('plane-game');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.width = WIDTH;
            this.canvas.height = HEIGHT;
            this.ratio = WIDTH / HEIGHT;
            this.inputManager.on('onchangePlane', this.onchangePlane.bind(this));
            this.setup();
        }

        restart () {

        }

        setup () {
            window.addEventListener('resize', this.resize.bind(this), false);
            this.resize();


            this.loop();
        }
        resize () {
            let currentHeight = window.innerHeight;
            let currentWidth = currentHeight * this.ratio;

            this.canvas.style.width = currentWidth + 'px';
            this.canvas.style.height = currentHeight + 'px';

            this.scale = currentWidth / WIDTH;
        }
        onchangePlane (obj) {
            this.entities.planeManger.updatePosition(obj.x, obj.y);
        }
        loop () {
            requestAnimationFrame(this.loop.bind(this));
            // change the model data
            this.entities.update();
            // render data to canvas
            this.entities.render();

        }
    }
    return GameManager;
});