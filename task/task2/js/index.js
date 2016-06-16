(function (window, createjs) {
    var canvas = document.getElementById('plane-game');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var enemyContainer,
        bulletContainer,
        hpContainer,
        plane,
        overContainer,
        bgContainer;

    function isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        }
        else {
            return false;
        }
    }

    var randomBG = Math.round(Math.random() * 4);
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
                    src: 'enemy2.png',
                    id: 'enemy2'
                },
                {
                    src: 'bullet.png',
                    id: 'bullet'
                },
                {
                    src: 'bg_move.png',
                    id: 'bg_move'
                },
                {
                    src: 'bg1.png',
                    id: 'bg1'
                },
                {
                    src: 'bg2.png',
                    id: 'bg2'
                },
                {
                    src: 'bg3.png',
                    id: 'bg3'
                },
                {
                    src: 'hp.png',
                    id: 'hp'
                }
            ],
            margin: 20,
            plane: {
                attack: 2,
                hp: 5,
                width: 80,
                height: 80
            },
            bullet: {
                speed: 6,
                interval: 15,
                currentInterval: 15,
                width: 10,
                height: 30,
                tick: function (that) {
                    this.currentInterval--;
                    if (this.currentInterval <= 0) {
                        that.addBullet(this);
                        this.currentInterval = this.interval;
                    }
                    this.move(that);
                },
                move: function (that) {
                    // move bullet
                    for (var i = 0; i < bulletContainer.getNumChildren(); i++) {
                        var bullet = bulletContainer.getChildAt(i);
                        bullet.y -= this.speed;
                    }
                }
            },
            enemy: [
                {
                    id: 'enemy1',
                    speed: 60,
                    hp: 1,
                    width: 90,
                    height: 85,
                    interval: 120,
                    minInterval: 80,
                    score: 10,
                    tick: function (that, event) {
                        if (this.currentInterval == null) {
                            this.currentInterval = this.interval;
                        }
                        this.currentInterval--;
                        if (this.currentInterval <= 0) {
                            that.addEnemy(this);
                            this.currentInterval = this.interval = Math.max(this.interval - that.score / 10, this.minInterval);
                        }
                        //this.move(that);
                    },
                    move: function (event) {

                        this.y += this.speed * event.delta / 1000;

                    }
                },
                {
                    id: 'enemy2',
                    width: 70,
                    height: 65,
                    score: 20,
                    speed: 40,
                    hp: 3,
                    interval: 200,
                    minInterval: 100,
                    tick: function (that) {
                        if (this.currentInterval == null) {
                            this.currentInterval = this.interval;
                        }
                        this.currentInterval--;
                        if (this.currentInterval <= 0) {
                            that.addEnemy(this);
                            this.currentInterval = this.interval = Math.max(this.interval - that.score / 10, this.minInterval);
                        }
                        //this.move(that);

                    },
                    move: function (event) {
                        this.y += this.speed * event.delta / 1000;
                    }
                }
            ]

        },
        score: 0,
        maxScore: 0,
        currentHP: undefined,
        currentBullet: 30,
        init: function () {
            this.currentHP = this.config.plane.hp;
            createjs.Ticker.setPaused(true);

            // save last Max Score
            //localStorage.setItem('MaxScore', 0);
            this.lastMaxScore = localStorage.getItem('MaxScore') || 0;
            //alert(this.lastMaxScore);
            this.loader = new createjs.LoadQueue();
            this.loader.addEventListener('complete', this.handleLoadComplete.bind(this));
            this.loader.addEventListener('progress', this.handleProgress.bind(this));
            this.loader.loadManifest(this.config.manifest, true, './img/');


        },
        handleProgress: function (data) {
            document.querySelector('.percent').innerHTML = (data.loaded * 100).toFixed(0) + '%';
        },
        handleLoadComplete: function () {
            document.querySelector('.percent').style.display = 'none';

            this.stage = new createjs.Stage(canvas);
            createjs.Touch.enable(this.stage);
            createjs.Ticker.setFPS(80);
            createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
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

            if (createjs.Ticker.getPaused()) {

            } else {

                this.config.bullet.tick(this, event);

                this.config.enemy.forEach(function (enemy) {
                    enemy.tick(this, event);
                }.bind(this));

                enemyContainer.children.forEach(function (enemy) {
                    enemy.move(event);
                }.bind(this));



                this.checkCollision();

                this.updateHP();
                this.updateFPS();
                this.updateScore();
                this.updateBG(event);
            }


            this.stage.update();
        },
        addBullet: function (obj) {


            var bulletResult = this.loader.getResult('bullet');
            var bullet = new createjs.Bitmap(bulletResult);
            bullet.x = this.plane.x + this.config.plane.width / 2 - bullet.getTransformedBounds().width / 2;
            bullet.y = this.plane.y - bullet.getTransformedBounds().height / 2;
            bullet.scaleX = obj.width / bullet.getBounds().width;
            bullet.scaleY = obj.height / bullet.getBounds().height;
            bulletContainer.addChild(bullet);
        },
        addEnemy: function (obj) {
            var enemyResult = this.loader.getResult(obj.id);
            var enemy = new createjs.Enemy({
                x: (canvas.width - 70) * Math.random(),
                y: 0,
                width: obj.width,
                height: obj.height,
                result: enemyResult,
                score: obj.score,
                hp: obj.hp,
                tick: obj.tick,
                move: obj.move,
                speed: obj.speed
            });


            enemyContainer.addChild(enemy);

        },

        checkCollision: function () {
            var bullet, enemy, i, l, j, len;
            // check out of screen
            for (i = 0; i < bulletContainer.getNumChildren(); i++) {
                bullet = bulletContainer.getChildAt(i);
                if (bullet.y < 0) {
                    bullet.isRemove = true;
                }
            }
            // check out of screen
            for (i = 0; i < enemyContainer.getNumChildren(); i++) {
                enemy = enemyContainer.getChildAt(i);
                if (enemy.y < 0 || enemy.y > canvas.height) {
                    enemy.isRemove = true;
                }
            }

            // check bullet hit enemy
            for (i = 0 , l = bulletContainer.getNumChildren(); i < l; i++) {
                for (j = 0, len = enemyContainer.getNumChildren(); j < len; j++) {
                    bullet = bulletContainer.getChildAt(i);
                    enemy = enemyContainer.getChildAt(j);
                    var x = bullet.x - bullet.getTransformedBounds().width / 2;
                    var y = bullet.y;
                    var realX = enemy.globalToLocal(x, y).x;
                    var realY = enemy.globalToLocal(x, y).y;
                    if (enemy.hitTest(realX, realY)) {
                        // hit
                        enemy.hp--;
                        if (enemy.hp <= 0) {
                            enemy.isRemove = true;
                            this.score += enemy.score;
                            // this.addParticle({x: enemy.x, y: enemy.y});
                        }
                        bullet.isRemove = true;
                    }

                }
            }
            // check plane hit enemy
            l = enemyContainer.getNumChildren();
            for (i = 0; i < l; i++) {
                enemy = enemyContainer.getChildAt(i);
                var planeRect = plane.getTransformedBounds();
                var enemyRect = enemy.getTransformedBounds();
                if (planeRect.x > enemyRect.x + enemyRect.width ||
                    planeRect.y > enemyRect.y + enemyRect.height ||
                    enemyRect.x > planeRect.x + planeRect.width ||
                    enemyRect.y > planeRect.y + planeRect.height) {
                } else {
                    // hit
                    this.currentHP--;
                    enemy.isRemove = true;
                    // this.addParticle({x: enemy.x, y: enemy.y});
                }
            }

            enemyContainer.children = enemyContainer.children.filter(function (enemy) {
                return !enemy.isRemove
            });
            bulletContainer.children = bulletContainer.children.filter(function (bullet) {
                return !bullet.isRemove
            });

        },
        initFPS: function () {
            var fps = this.fps = new createjs.Text('FPS:' + createjs.Ticker.getMeasuredFPS());
            fps.x = canvas.width - fps.getMeasuredWidth() - 10;
            fps.y = canvas.height - fps.getMeasuredHeight() - 10;

            this.stage.addChild(fps);
        },
        updateScore: function () {
            this.maxScore = Math.max(this.score, this.lastMaxScore);
            this.scoreText.text = 'Score: ' + this.score;
            this.maxScoreText.text = 'Max Score: ' + this.maxScore;
        },
        updateFPS: function () {
            this.fps.text = 'FPS:' + createjs.Ticker.getMeasuredFPS();
        },
        updateBG: function (event) {
            if (bgContainer.y >= canvas.height) {
                bgContainer.y = 0;
            }
            bgContainer.y += event.delta / 1000 * 10;
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
            startButton.x = canvas.width / 2 - startButton.getBounds().width / 2;
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
            gameContainer.visible = true;
            var score = this.scoreText = new createjs.Text('Score: ' + this.score, '20px Arial');
            score.x = this.config.margin;
            score.y = this.config.margin;
            var maxScore = this.maxScoreText = new createjs.Text('Max Score: ' + this.maxScore, '20px Arial');
            maxScore.x = this.config.margin;
            maxScore.y = score.getMeasuredHeight() + 10 + score.y;
            hpContainer = new createjs.Container();

            var planeResult = this.loader.getResult('plane');
            plane = this.plane = new createjs.Bitmap(planeResult);
            plane.scaleX = this.config.plane.width / plane.getBounds().width;
            plane.scaleY = this.config.plane.height / plane.getBounds().height;
            plane.x = canvas.width / 2 - this.config.plane.width / 2;
            plane.y = canvas.height - this.config.plane.height - 50;

            // bg
            bgContainer = new createjs.Container();
            var bgResult = this.loader.getResult('bg_move');
            var bg1 = new createjs.Bitmap(bgResult);
            var bg2 = new createjs.Bitmap(bgResult);
            bg1.x = bg1.y = bg2.x = 0;
            bg2.scaleX = bg1.scaleX = canvas.width / bg1.getBounds().width;
            bg2.scaleY = bg1.scaleY = canvas.height / bg1.getBounds().height;
            bg2.y = -canvas.height;
            bgContainer.addChild(bg1, bg2);

            var bgConstContainer = new createjs.Container();
            for (var i = 1, len = 3; i <= len; i++) {
                bgResult = this.loader.getResult('bg' + i);
                var bg = new createjs.Bitmap(bgResult);
                bg.x = bg.y = 0;
                bg.scaleX = canvas.width / bg.getBounds().width;
                bg.scaleY = canvas.height / bg.getBounds().height;
                bgConstContainer.addChild(bg);
            }



            // if (window.DeviceOrientationEvent && isMobile()) {
            if (false) {
                // if support device orientation
                window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
            } else {
                // if not support device orientation, use touch move
                this.stage.addEventListener('stagemousemove', this.handlePlaneTouchMove.bind(this));
            }

            bulletContainer = new createjs.Container();
            enemyContainer = new createjs.Container();

            gameContainer.addChild(bgContainer, bgConstContainer, score, maxScore, hpContainer, plane, bulletContainer, enemyContainer);

            this.updateHP();
            this.stage.addChild(gameContainer);

        },
        handleDeviceOrientation: function (event) {
            var factor = 0.6;
            var betaDirection = Math.round(event.beta * factor);
            var gammaDirection = Math.round(event.gamma * factor);
            var x = (plane.x + gammaDirection);
            var y = (plane.y + betaDirection);
            this.updatePlane({
                x: x,
                y: y
            });
        },
        handlePlaneTouchMove: function (e) {
            var point = {
                x: e.localX - this.config.plane.width / 2,
                y: e.localY - this.config.plane.height / 2
            };

            this.updatePlane(point);

        },
        initOver: function () {
            overContainer = this.overContainer = new createjs.Container();
            var restartButton = new createjs.Button('Restart Game');
            restartButton.x = canvas.width / 2 - restartButton.getBounds().width / 2;
            restartButton.y = canvas.height / 2;
            restartButton.on('click', this.restartGame.bind(this));

            overContainer.addChild(restartButton);
            this.stage.addChild(overContainer);
        },
        restartGame: function () {
            this.currentHP = this.config.plane.hp;
            this.score = 0;
            this.stage.removeChild(this.gameContainer);
            this.initPlay();
            createjs.Ticker.setPaused(false);
            this.startContainer.visible = false;
            this.overContainer.visible = false;
            this.gameContainer.visible = true;
        },
        startGame: function () {
            this.startContainer.visible = false;
            this.gameContainer.visible = true;
            createjs.Ticker.setPaused(false);
        },
        gameOver: function () {
            this.startContainer.visible = false;
            this.gameContainer.visible = false;
            this.overContainer.visible = true;
            this.lastMaxScore = this.maxScore;
            localStorage.setItem('MaxScore', this.maxScore);
            createjs.Ticker.setPaused(true);
        },
        updateHP: function () {
            hpContainer.removeAllChildren();
            for (var i = 0, len = this.currentHP; i < len; i++) {
                var hpResult = this.loader.getResult('hp');
                var hp = new createjs.Bitmap(hpResult);
                hp.scaleX = hp.scaleY = window.innerWidth / 649;
                hp.x = i * window.innerWidth / 649 * 62;
                hpContainer.addChild(hp);
            }
            if (this.currentHP <= 0) {
                this.gameOver();
                return false;
            }
            // hpContainer.x = canvas.width - hpContainer.getBounds().width - this.config.margin;
            // hpContainer.y = this.config.margin;
            hpContainer.x = 285 / 649 * window.innerWidth;
            hpContainer.y = 19 / 1136 * window.innerHeight;
        },
        updatePlane: function (point) {
            point.x = Math.min(point.x, canvas.width - this.config.plane.width);
            point.x = Math.max(point.x, 0);
            point.y = Math.min(point.y, canvas.height - this.config.plane.height);
            point.y = Math.max(point.y, 0);

            plane.x = point.x;
            plane.y = point.y;
        }
    };


    window.onload = gameManager.init.bind(gameManager);
    window.gameManager = gameManager;
})(window, createjs);
