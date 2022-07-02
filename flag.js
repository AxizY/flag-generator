var canvas = document.getElementById('flag');
var ctx = canvas.getContext('2d');
var columnList = document.getElementById("columnList");

// settings that can be changed
var seed = "flag";
const pixelSize = 64;
const flagHeight = 8;
var colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#00ffff',
    '#ff00ff',
    '#ffffff',
    '#000000'
];


const generator = new Math.seedrandom(seed);
const randomNumber = generator();

var widthPixels = Math.floor(window.innerWidth / pixelSize);
canvas.width = widthPixels * pixelSize;
canvas.height = pixelSize * flagHeight;
var column = 0;
var map = [];

function drawPixel(x, y) {
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function genPixel() {
    map.push(colors[generator() * colors.length | 0]);
}

function drawColumn(x) {
    for (var i = 0; i < flagHeight; i++) {
        var pix = ((x+column)*flagHeight)-1+i;
        if (pix+1 > map.length) {
            genPixel();
        }
        ctx.fillStyle = map[pix];
        drawPixel(x, i);
    }
}

function drawFlag() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < widthPixels; i++) {
        drawColumn(i);
    }
}

window.addEventListener('resize', function() {
    var widthPixels = Math.floor(window.innerWidth / pixelSize);
    canvas.width = widthPixels * pixelSize;
    canvas.height = pixelSize * flagHeight;
    drawFlag();
})

document.addEventListener('keydown', function (e) {
    if (e.key == "ArrowRight") {
        column++;
    }
    if (e.key == "ArrowLeft" && column > 0) {
        column--;
    }
    columnList.innerHTML = "First " + (column+widthPixels) + " Columns Displayed";
    drawFlag();
});

columnList.innerHTML = "First " + (column+widthPixels) + " Columns Displayed";
drawFlag();