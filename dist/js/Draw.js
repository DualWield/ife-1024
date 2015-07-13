'use strict';

define(function (require) {
    var thumbImg = document.createElement('img');
    thumbImg.src = 'dist/img/plane.png';

    var Draw = {
        drawPlane: function drawPlane(x, y) {
            var r = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

            var ctx = planeCanvas.getContext('2d');
            console.log(x, y);
            ctx.save();
            ctx.beginPath();
            ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(thumbImg, 0, 0, thumbImg.width, thumbImg.width, x + 5 - r, y + 5 - r, r * 2, r * 2);
            ctx.restore();
        }
    };

    return Draw;
});