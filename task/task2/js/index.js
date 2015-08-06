(function (window, createjs) {
    var canvas = document.getElementById('plane-game');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    var gameManager = {
        config: {
            manifest: [
                {
                    src: 'plane.png',
                    id: 'plane'
                },
                {
                    src: 'enemy1.png',
                    id: 'enemy1'
                },
                {
                    src: 'bullet.png',
                    id: 'bullet'
                },
                {
                    src: 'hp.png',
                    id: 'hp'
                }
            ],
            margin: 20,
            plane: {
                speed: 30,
                attack: 2,
                hp: 5,
                width: 80,
                height: 80
            },
            bullet: {
                speed: 5,
                interval: 10,
                currentInterval: 10
            },
            enemy: [
                {
                    speed: 10,
                    hp: 1,
                    interval: 10,
                    currentInterval: 10
                },
                {
                    speed: 20,
                    hp: 3,
                    interval: 10,
                    currentInterval: 10
                }
            ]

        },
        score: 0,
        maxScore: 0,
        currentHP: undefined,
        currentBullet: 30,
        init: function () {
            this.currentHP = this.config.plane.hp;

            this.loader = new createjs.LoadQueue();
            this.loader.addEventListener('complete', this.handleLoadComplete.bind(this));
            this.loader.loadManifest(this.config.manifest, true, './img/');

        },
        handleLoadComplete: function () {

            this.stage = new createjs.Stage(canvas);
            createjs.Touch.enable(this.stage);
            createjs.Ticker.setFPS(200);
            //this.stage.enableMouseOver(60);
            createjs.Ticker.addEventListener("tick", this.tick.bind(this));

            this.initStart();
            this.initPlay();
            this.initOver();
            this.initFPS();

            this.gameContainer.visible = false;
            this.overContainer.visible = false;
        },
        tick: function (event) {
            // some times later, add bullet
            this.config.bullet.currentInterval--;
            var bulletContainer = this.gameContainer.getChildAt(4);
            if(this.config.bullet.currentIntervalt <= 0) {
                this.addBullet();
                this.config.bullet.currentInterval = this.config.bullet.interval;
            }

            // some times later, add enemy
            Math.random()


            for (var i = 0 ; i < bulletContainer.getNumChildren(); i++ ){
                var bullet = bulletContainer.getChildAt(i);
                bullet.y -= this.config.bullet.speed;

                if(bullet.y < 0) {
                    bulletContainer.removeChildAt(i);
                }
            }
            this.updateFPS();
            this.stage.update();
        },
        addBullet: function () {
            var bulletContainer = this.gameContainer.getChildAt(4);

            var bulletResult = this.loader.getResult('bullet');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = this.plane.x + this.config.plane.width / 2 - bullet.getTransformedBounds().width / 2;
            bullet.y = this.plane.y - bullet.getTransformedBounds().height / 2;
            bullet.scaleX = bullet.scaleY = 0.7;
            bulletContainer.addChild(bullet);
        },
        initFPS: function () {
            var fps = this.fps =  new createjs.Text('FPS:' + createjs.Ticker.getMeasuredFPS());
            fps.x = canvas.width - fps.getMeasuredWidth() - 10;
            fps.y = canvas.height - fps.getMeasuredHeight() - 10;

            this.stage.addChild(fps);
        },
        updateFPS: function () {
            this.fps.text = 'FPS:' + createjs.Ticker.getMeasuredFPS();
        },
        initStart: function () {
            var startContainer = this.startContainer = new createjs.Container();
            var startBackground = new createjs.Shape();
            startBackground
                .graphics
                .setStrokeStyle(1)
                .beginFill('blue')
                .drawRoundRect(0, 0, canvas.width, canvas.height);

            var startButton = new createjs.Button('Start Game');
            startButton.x = canvas.width / 2 - startButton.getBounds().width/2;
            startButton.y = canvas.height / 2;
            startButton.on('click', this.startGame.bind(this));
            startContainer.addChild(startBackground, startButton);

            this.stage.addChild(startContainer);
        },
        initPlay: function () {
            // game interface
            var gameContainer = this.gameContainer = new createjs.Container();
            var hit = new createjs.Shape();
            hit.graphics.beginFill("#000").drawRect(0, 0, canvas.width, canvas.height);
            gameContainer.hitArea = hit;

            var score = new createjs.Text('Score: ' + this.score, '20px Arial');
            score.x = this.config.margin;
            score.y = this.config.margin;
            var maxScore = new createjs.Text('Max Score: ' + this.maxScore, '20px Arial');
            maxScore.x = this.config.margin;
            maxScore.y = score.getMeasuredHeight() + 10 + score.y;
            var hpContainer = new createjs.Container();

            var planeResult = this.loader.getResult('plane');
            var plane = this.plane = new createjs.Bitmap(planeResult);
            plane.scaleX = this.config.plane.width / plane.getBounds().width;
            plane.scaleY = this.config.plane.height / plane.getBounds().height;
            plane.x = canvas.width / 2 - this.config.plane.width / 2;
            plane.y = canvas.height - this.config.plane.height - 50;

            gameContainer.addEventListener('mousedown', this.handlePlaneMouseDown.bind(this));
            this.stage.addEventListener('stagemousemove', this.handlePlaneTouchMove.bind(this));

            var bulletContainer = new createjs.Container();


            gameContainer.addChild(score, maxScore, hpContainer, plane, bulletContainer);

            this.updateHP();
            this.stage.addChild(gameContainer);

        },
        handlePlaneMouseDown: function (event) {
        },
        handlePlaneTouchMove: function (e) {
            var point = {
                x: e.localX,
                y: e.localY
            };

            this.updatePlane(point);

        },
        initOver: function () {
            var overContainer = this.overContainer = new createjs.Container();

            this.stage.addChild(overContainer);
        },
        startGame: function () {
            this.startContainer.visible = false;
            this.gameContainer.visible = true;

        },
        updateHP: function () {
            var hpContainer = this.gameContainer.getChildAt(2);
            hpContainer.removeAllChildren();
            for (var i = 0 , len = this.currentHP; i < len ; i++) {
                var hpResult = this.loader.getResult('hp');
                var hp = new createjs.Bitmap(hpResult);
                hp.scaleX = 0.1;
                hp.scaleY = 0.1;
                hp.x = i * 30;
                hpContainer.addChild(hp);
            }
            hpContainer.x = canvas.width - hpContainer.getBounds().width - this.config.margin;
            hpContainer.y = this.config.margin;
        },
        updatePlane: function (point) {
            var plane = this.gameContainer.getChildAt(3);
            plane.x = point.x - this.config.plane.width/2;
            plane.y = point.y - this.config.plane.height/2;
        }
    };




    window.onload = gameManager.init.bind(gameManager);
    window.gameManager = gameManager;
})(window, createjs);