/*
    Fractal tree with adjustible settings

    Settings are adjusted via sliders with oninput events. Every event regrows tree with new values and draws it.
    Tree is generated with branch object that has function to grow new branches after old ones.

*/

let screenWidth = screen.width - 20;
let screenHeight = 350;
let tree = [];
let canvas, ctx;
let len = 0.67;
let angle = 45;
let variation = 0;
let rootLength = 100;
let iterations = 6;

// Get reference for sliders
const angleSlider = document.querySelector('#angle');
const lenSlider = document.querySelector('#len');
const variationSlider = document.querySelector('#variation');
const iterationsSlider = document.querySelector('#iterations');
const rootSlider = document.querySelector('#rootLength');

// Event handlers for sliders
rootSlider.oninput = () => {
    rootLength = rootSlider.value;
    growTree(iterations, angle, len, variation);
    drawTree()
}

iterationsSlider.oninput = () => {
    iterations = iterationsSlider.value;
    growTree(iterations, angle, len, variation);
    drawTree()
}

lenSlider.oninput = () => {
    len = lenSlider.value;
    growTree(iterations, angle, len, variation);
    drawTree()
}

angleSlider.oninput = () => {
    angle = angleSlider.value;
    growTree(iterations, angle, len, variation);
    drawTree()
}

variationSlider.oninput = () => {
    variation = variationSlider.value;
    growTree(iterations, angle, len, variation);
    drawTree()
}

// Initial setup and first tree generation and draw.
function init() {
    canvas = document.querySelector('#myCanvas');
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    growTree(iterations, angle, len, variation);
    drawTree()
}

// Generate tree with user given values
function growTree(iterations, angle, length, variation) {
    tree = [];
    let branchWidth = 6.0;
    let begin = new Vector(screenWidth / 2, screenHeight);
    let end = new Vector(screenWidth / 2, screenHeight - rootLength);
    let root = new Branch(begin, end, branchWidth);
    tree.push(root);
    for (let i = 0; i < iterations; i++) {
        for (let i = tree.length - 1; i >= 0; i--) {
            if (!tree[i].finished) {
                tree.push(tree[i].branchOut(angle, length, branchWidth, variation));
                tree.push(tree[i].branchOut(-angle, length, branchWidth, variation));
                tree[i].finished = true;
            }

            if (branchWidth < 0.5) {
                branchWidth = 1;
            } else {
                branchWidth -= 0.05;
            }
        }
    }
}

// Draw tree with call to branch objects drawBranch function. It gives values for drawing this branch.
function drawTree() {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    for (let i = 0; i < tree.length; i++) {
        let branch = tree[i].drawBranch();
        ctx.beginPath();
        ctx.lineWidth = branch.thickness;
        ctx.moveTo(branch.startX, branch.startY);
        ctx.lineTo(branch.endX, branch.endY);
        ctx.stroke();
    }
}

window.addEventListener('load', init);