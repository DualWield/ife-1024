(function () {
    'use strict';
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var keydownCode = {
        left: 37,
        right: 39
    };

    var params = {
        timeSet: 6,
        maxGolds: 8,
        heroSpeed: 10,
        goldSpeed: 5,
        margin: 32,
        manifest: null
    };

    var gameInfo = {
        stage: {
            stage: null,
            width: 0,
            height: 0
        },
        // may change role image later
        hero: {
            heroImage: null,
            height: 0,
            width: 0,
            moveLeft: false,
            moveRight: false,
            heroSpeed: params.heroSpeed
        },
        gold: {
            goldImage: null,
            goldSpeed: params.goldSpeed
        },

        setting: null,
        score: 0,
        start: true,
        // text
        timeText: null,
        scoreText: null,

        remainTime: params.timeSet * 1000,

        // containers
        goldContainer: null,
        overContainer: null,
        settingContainer: null,

        // loader
        loader: null,

        resetRamainTime: function () {
            this.remainTime = params.timeSet * 1000;
        }
    };

    // add eventListener
    window.addEventListener('keydown', function (e) {
        if (!e) {
            e = window.event;
        }
        switch (e.keyCode) {
            case keydownCode.left:
                gameInfo.hero.moveLeft = true;
                return false;
            case keydownCode.right:
                gameInfo.hero.moveRight = true;
                return false;
        }
    }, false);
    window.addEventListener('keyup', function (e) {
        if (!e) {
            e = window.event;
        }
        switch (e.keyCode) {
            case keydownCode.left:
                gameInfo.hero.moveLeft = false;
                break;
            case keydownCode.right:
                gameInfo.hero.moveRight = false;
                break;
        }
        return false;
    }, false);
    window.addEventListener('touchstart', function (event) {
        if (event.touches.length == 1) {
            if (event.touches[0].clientX > gameInfo.hero.heroImage.x) {
                gameInfo.hero.moveRight = true;
            }
            else {
                gameInfo.hero.moveLeft = true;
            }
        }
    }, false);
    window.addEventListener('touchend', function () {
        gameInfo.hero.moveRight = false;
        gameInfo.hero.moveLeft = false;
    }, false);
    window.addEventListener('touchmove', function () {
        return false;
    }, false);


    window.onload = init;

    // async load some needed file and init Container
    function init() {
        // this stage container all sprite
        gameInfo.stage.satge = new createjs.Stage(canvas);
        // mouse event too expensive, disabled default
        gameInfo.stage.satge.enableMouseOver(60);

        gameInfo.stage.width = gameInfo.stage.satge.canvas.width;
        gameInfo.stage.height = gameInfo.stage.satge.canvas.height;

        // all image
        params.manifest = [
            {
                src: 'cat.png',
                id: 'cat'
            },
            {
                src: 'gold.png',
                id: 'gold'
            },
            {
                src: 'setting.png',
                id: 'setting'
            }
        ];

        // all gold push in this container
        gameInfo.goldContainer = new createjs.Container();
        gameInfo.scoreText = new createjs.Text('分数: 0', '36px Arial', '#fff');
        gameInfo.scoreText.x = params.margin;
        gameInfo.scoreText.y = params.margin;

        // text for remaining time
        gameInfo.timeText = new createjs.Text('剩余时间: ' + gameInfo.remainTime / 1000, '36px Arial', '#fff');
        gameInfo.timeText.x = gameInfo.stage.width - gameInfo.timeText.getMeasuredWidth() - params.margin;
        gameInfo.timeText.y = params.margin;


        // async load image
        gameInfo.loader = new createjs.LoadQueue();
        gameInfo.loader.addEventListener('complete', handleLoadComplete);
        gameInfo.loader.loadManifest(params.manifest, true, './img/');
    }

    // after extern file loaded
    function handleLoadComplete() {

        // init cat
        gameInfo.hero.heroImage = new createjs.Bitmap(gameInfo.loader.getResult('cat'));
        gameInfo.hero.heroImage.x = 100;
        gameInfo.hero.heroImage.y = gameInfo.stage.height - 96;
        gameInfo.hero.height = gameInfo.hero.heroImage.image.height;
        gameInfo.hero.width = gameInfo.hero.heroImage.image.width;

        // init gold
        gameInfo.gold.goldImage = new createjs.Bitmap(gameInfo.loader.getResult('gold'));

        // add setting icon
        gameInfo.setting = new createjs.Bitmap(gameInfo.loader.getResult('setting'));
        gameInfo.setting.setTransform(gameInfo.stage.width - gameInfo.setting.image.width / 2 - 10, gameInfo.stage.height - gameInfo.setting.image.height / 2 - 10, 0.5, 0.5);
        gameInfo.setting.on('click', handleSetting, this);

        // add all sprite in stage
        gameInfo.stage.satge.addChild(gameInfo.hero.heroImage, gameInfo.goldContainer, gameInfo.scoreText, gameInfo.timeText, gameInfo.setting);

        // add tick
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener('tick', tick);
    }

    // setting click eventHandle
    function handleSetting() {
        gamePause();
        drawSettingRect();
    }

    // draw setting panel
    function drawSettingRect() {
        gameInfo.settingContainer = new createjs.Container();

        var s = new createjs.Shape();
        s.graphics.setStrokeStyle(1).beginStroke("black").beginFill("#FFF68F").drawRoundRect(gameInfo.stage.width / 4, gameInfo.stage.height / 4, gameInfo.stage.width / 2, gameInfo.stage.height / 2, 30);

        gameInfo.settingContainer.addChild(s);

        gameInfo.stage.satge.addChild(gameInfo.settingContainer);

        gameInfo.stage.satge.update();
    }

    // draw game over panel
    function drawOverRect() {
        gameInfo.overContainer = new createjs.Container();

        var s = new createjs.Shape();
        s.graphics.setStrokeStyle(1).beginStroke("black").beginFill("#FFF68F").drawRoundRect(gameInfo.stage.width / 4, gameInfo.stage.height / 4, gameInfo.stage.width / 2, gameInfo.stage.height / 2, 30);

        var overScoreText = new createjs.Text('你的分数: ' + gameInfo.score, '36px Arial', '#000');
        overScoreText.textAlign = 'center';
        overScoreText.x = gameInfo.stage.width / 2;
        overScoreText.y = gameInfo.stage.height / 2;

        var restartText = new createjs.Text('点击面板重新开始', '12 Arial', '#000');
        restartText.textAlign = 'center';
        restartText.x = gameInfo.stage.width / 2;
        restartText.y = overScoreText.y + 60;

        gameInfo.overContainer.addChild(s, overScoreText, restartText);

        s.on('click', restart, this);

        gameInfo.stage.satge.addChild(gameInfo.overContainer);
        gameInfo.stage.satge.update();
    }

    // run when game over
    function handleGameOver() {
        gamePause();
        drawOverRect();
    }

    // add new gold
    // @params {Number} x y   coordinate to the new gold, for new feature  maybe
    // return {createjs.Bitmap}
    function addGold(x, y) {
        var newGold = new createjs.Bitmap(gameInfo.loader.getResult('gold'));
        newGold.y = y || 0;
        newGold.x = x || Math.random() * gameInfo.stage.width;
        gameInfo.goldContainer.addChild(newGold);
        return newGold;
    }


    // run when game pause
    function gamePause() {
        gameInfo.start = false;
        createjs.Ticker.setPaused(true);
    }

    // restart game
    function restart() {
        gameInfo.start = true;
        gameInfo.score = 0;
        createjs.Ticker.setPaused(false);
        gameInfo.stage.satge.removeChild(gameInfo.overContainer, gameInfo.settingContainer);
        gameInfo.remainTime = createjs.Ticker.getTime() + params.timeSet * 1000;
        gameInfo.goldContainer.removeAllChildren();
        gameInfo.scoreText.text = '分数: ' + gameInfo.score;
        gameInfo.stage.satge.update();
    }

    // tick event
    function tick(event) {

        // if pause or gameOver or others
        if (createjs.Ticker.getPaused()) {
            return false;
        }

        var deltaS = event.delta / 1000;
        var position = gameInfo.hero.heroImage.x + 150 * deltaS;
        if (gameInfo.remainTime <= createjs.Ticker.getTime()) {
            // time over
            handleGameOver();
            return;
        }

        // update remain time
        gameInfo.timeText.text = '剩余时间: ' + Math.floor((gameInfo.remainTime - createjs.Ticker.getTime()) / 1000);

        // move cat
        if (gameInfo.hero.moveLeft) {
            if (gameInfo.hero.heroImage.x > 0) {
                gameInfo.hero.heroImage.x -= gameInfo.hero.heroSpeed;
            }
        }
        if (gameInfo.hero.moveRight) {
            if (gameInfo.hero.heroImage.x + 50 < gameInfo.stage.width) {
                gameInfo.hero.heroImage.x += gameInfo.hero.heroSpeed;
            }
        }

        // add new Gold if the number less than params.maxGolds
        var numOfGold = gameInfo.goldContainer.getNumChildren();
        if (numOfGold < params.maxGolds && Math.random() < 0.05) {
            addGold();
            numOfGold++;
        }

        // move each gold
        var thisGold;
        for (var i = 0; i < numOfGold; i++) {
            thisGold = gameInfo.goldContainer.getChildAt(i);
            // touch
            if (thisGold.y + gameInfo.gold.goldImage.image.height > (gameInfo.stage.height - gameInfo.hero.height) && thisGold.x + gameInfo.gold.goldImage.image.width > gameInfo.hero.heroImage.x && thisGold.x < gameInfo.hero.heroImage.x + gameInfo.hero.width) {
                gameInfo.goldContainer.removeChild(thisGold);
                numOfGold--;
                gameInfo.score++;
                gameInfo.scoreText.text = '分数: ' + gameInfo.score;
            }
            // exceed screen
            else if (thisGold.y > gameInfo.stage.height) {
                gameInfo.goldContainer.removeChild(thisGold);
                numOfGold--;
            }
            // move down
            else {
                thisGold.y += gameInfo.gold.goldSpeed;
            }
        }

        // redraw
        gameInfo.stage.satge.update(event);
    }
})();
