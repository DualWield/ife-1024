(function () {
    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    var stage, w, h, loader;
    var cat, gold;
    var goldContainer;

    var keydownCode = {
        left: 37,
        right: 39
    };


    var setting;

    var params = {
        timeSet: 6,
        maxGolds: 8
    };

    var gameInfo = {
        // may change role image later
        hero: {
            height: 0,
            width: 0,
            moveLeft: false,
            moveRight: false
        },
        gold: {

        },
        score: 0,
        timeText: null,
        scoreText: null,
        start: true,

        remainTime: params.timeSet * 1000,
        overContainer: null,
        settingContainer: null,
        resetRamainTime: function() {
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
            if (event.touches[0].clientX > cat.x) {
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


    window.onload = init;

    // async load some needed file and init Container
    function init() {
        // this stage container all sprite
        stage = new createjs.Stage(canvas);
        // mouse event too expensive, disabled default
        stage.enableMouseOver(60);

        w = stage.canvas.width;
        h = stage.canvas.height;

        // all image
        manifest = [
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
        goldContainer = new createjs.Container();
        gameInfo.scoreText = new createjs.Text('分数: 0', '36px Arial', '#fff');
        gameInfo.scoreText.x = 32;
        gameInfo.scoreText.y = 32;

        // text for remaining time
        gameInfo.timeText = new createjs.Text('剩余时间: ' + gameInfo.remainTime / 1000, '36px Arial', '#fff');
        gameInfo.timeText.x = w - 220 - 32;
        gameInfo.timeText.y = 32;


        // async load image
        loader = new createjs.LoadQueue();
        loader.addEventListener('complete', handleLoadComplete);
        loader.loadManifest(manifest, true, './img/');
    }

    // after extern file loaded
    function handleLoadComplete() {

        // init cat
        cat = new createjs.Bitmap(loader.getResult('cat'));
        cat.x = 100;
        cat.y = h - 96;
        gameInfo.hero.height = cat.image.height;
        gameInfo.hero.width = cat.image.width;

        // init gold
        gold = new createjs.Bitmap(loader.getResult('gold'));

        // add setting icon
        setting = new createjs.Bitmap(loader.getResult('setting'));
        setting.setTransform(w - setting.image.width / 2 - 10, h - setting.image.height / 2 - 10, 0.5, 0.5);
        setting.on('click', handleSetting, this);

        // add all sprite in stage
        stage.addChild(cat, goldContainer, gameInfo.scoreText, gameInfo.timeText, setting);

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
        s.graphics.setStrokeStyle(1).beginStroke("black").beginFill("#FFF68F").drawRoundRect(w / 4, h / 4, w / 2, h / 2, 30);

        gameInfo.settingContainer.addChild(s);

        stage.addChild(gameInfo.settingContainer);

        stage.update();
    }

    // draw game over panel
    function drawOverRect() {
        gameInfo.overContainer = new createjs.Container();

        var s = new createjs.Shape();
        s.graphics.setStrokeStyle(1).beginStroke("black").beginFill("#FFF68F").drawRoundRect(w / 4, h / 4, w / 2, h / 2, 30);

        var overScoreText = new createjs.Text('你的分数: ' + gameInfo.score, '36px Arial', '#000');
        overScoreText.textAlign = 'center';
        overScoreText.x = w / 2;
        overScoreText.y = h / 2;

        var restartText = new createjs.Text('点击面板重新开始', '12 Arial', '#000');
        restartText.textAlign = 'center';
        restartText.x = w / 2;
        restartText.y = overScoreText.y + 60;

        gameInfo.overContainer.addChild(s, overScoreText, restartText);

        s.on('click', restart, this);

        stage.addChild(gameInfo.overContainer);
        stage.update();
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
        var newGold = new createjs.Bitmap(loader.getResult('gold'));
        newGold.y = y || 0;
        newGold.x = x || Math.random() * w;
        goldContainer.addChild(newGold);
        return newGold;
    }


    // run when game pause
    function gamePause() {
        gameInfo.start = false;
        createjs.Ticker.paused = true;
    }

    // restart game
    function restart() {
        gameInfo.start = true;
        gameInfo.score = 0;
        createjs.Ticker.paused = false;
        stage.removeChild(gameInfo.overContainer, gameInfo.settingContainer);
        gameInfo.remainTime = createjs.Ticker.getTime() + params.timeSet * 1000;
        goldContainer.removeAllChildren();
        gameInfo.scoreText.text = '分数: ' + gameInfo.score;
        stage.update();
    }

    // tick event
    function tick(event) {

        // if pause or gameOver or others
        if (!gameInfo.start) {
            return false;
        }

        var deltaS = event.delta / 1000;
        var position = cat.x + 150 * deltaS;
        //console.log(gameInfo.remainTime);
        if (gameInfo.remainTime <= createjs.Ticker.getTime()) {
            // time over
            handleGameOver();
            return;
        }

        // update remain time
        gameInfo.timeText.text = '剩余时间: ' + Math.floor((gameInfo.remainTime - createjs.Ticker.getTime()) / 1000);

        // move cat
        if (gameInfo.hero.moveLeft) {
            if (cat.x > 0) {
                cat.x -= 10;
            }
        }
        if (gameInfo.hero.moveRight) {
            if (cat.x + 50 < w) {
                cat.x += 10;
            }
        }

        // add new Gold if the number less than params.maxGolds
        var numOfGold = goldContainer.getNumChildren();
        if (numOfGold < params.maxGolds && Math.random() < 0.05) {
            addGold();
            numOfGold++;
        }

        // move each gold
        var thisGold;
        for (var i = 0; i < numOfGold; i++) {
            thisGold = goldContainer.getChildAt(i);
            // touch
            if (thisGold.y + gold.image.height > (h - gameInfo.hero.height) && thisGold.x + gold.image.width > cat.x && thisGold.x < cat.x + gameInfo.hero.width) {
                goldContainer.removeChild(thisGold);
                numOfGold--;
                gameInfo.score++;
                gameInfo.scoreText.text = '分数: ' + gameInfo.score;
            }
            // exceed screen
            else if (thisGold.y > h) {
                goldContainer.removeChild(thisGold);
                numOfGold--;
            }
            // move down
            else {
                thisGold.y += 5;
            }
        }

        // redraw
        stage.update(event);
    }
})();
