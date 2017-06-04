function fern(canv, ww, hh, a, b, c, d) {//Data from page 87 of "Fractals Everywhere"
    var a = [0, .85, .2, -.15];
    var b = [0, .04, -.26, .28];
    var c = [0, -.04, .23, .26];
    var d = [.16, .85, .22, .24];
    var e = [0, 0, 0, 0];
    var f = [0, .16, .16, .044];
    var p = [];
    var cp = [];
    var maxn = 200000, i;
    var psum = 0;//Here we calulate the probabilities from matrix determinants
    for (i = 0; i < 4; ++i) {
        p[i] = Math.abs(a[i] * d[i] - b[i] * c[i]);
        psum += p[i];
    }
    for (i = 0; i < 4; ++i) {
        p[i] /= psum;
        if (p[i] < 1e-2)//If a probabilty is very small the picture isn't so good so just use 1/100
            p[i] = 1e-2;
    }
    cp[0] = 0;
    for (i = 1; i < 5; ++i) {
        cp[i] = cp[i - 1] + p[i - 1];
    }
    if (cp[4] > 1) {
        for (i = 0; i < 5; ++i) {
            cp[i] /= cp[4];
        }
    }
    var j = 0;//Random Iteration Algorithm
    var x = 0;
    var y = 0;
    var xn = 0;
    var yn = 0;
    var prob;
    while (j++ < maxn) {
        prob = Math.random();
        for (i = 0; i < 4; ++i) {
            canv.beginPath()
            if (i == 0)
                canv.fillStyle = "blue";
            else if (i % 4 == 1)
                canv.fillStyle = "red";
            else if (i % 4 == 2)
                canv.fillStyle = "green";
            else if (i % 4 == 3)
                canv.fillStyle = "yellow";
            if (prob > cp[i] && prob <= cp[i + 1]) {
                xn = a[i] * x + b[i] * y + e[i];
                yn = c[i] * x + d[i] * y + f[i];
                x = xn;
                y = yn;
                if (j > 100) {
                    canv.fillRect(x * ww + ww/2, hh  - y * hh, 1, 1);
                }
                canv.stroke();
            }
        }
    }
}
var c = document.getElementById("fernCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(0, 0, c.width, c.height);
fern(ctx, c.width, c.height);
