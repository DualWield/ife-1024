(function (window, createjs) {

    function Button(label, color) {
        this.Container_constructor();

        this.color = color || '#ccc';
        this.label = label;

        this.setup();
    }

    var p = createjs.extend(Button, createjs.Container);


    p.setup = function () {
        var text = new createjs.Text(this.label, "20px Arial", "#000");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth() + 30;
        var height = text.getMeasuredHeight() + 20;

        text.x = width / 2;
        text.y = 10;

        var background = new createjs.Shape();
        background
            .graphics
            .setStrokeStyle(2)
            .beginStroke('#000')
            .beginFill(this.color)
            .drawRoundRect(0, 0, width, height, 10);

        this.addChild(background, text);
      /*  this.on("click", this.handleClick);
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);*/
        this.cursor = "pointer";

        this.mouseChildren = false;

        this.offset = Math.random() * 10;
        this.count = 0;
    };

    p.handleClick = function (event) {
        alert("You clicked on a button: " + this.label);
    };

    p.handleRollOver = function (event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    createjs.Button = createjs.promote(Button, "Container");


    function Bullet (obj) {
        this.Container_constructor();
        this.x = obj.x;
        this.y = obj.y;

        this.setup();
    }
    var bullet = createjs.extend(Bullet, createjs.Container);
    bullet.setup = function () {
        
    }

})(window, createjs);