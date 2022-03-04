/*
    Fractal tree with adjustible settings



*/

const width = 600;
const height = 500;
let tree = [];
let canvas, ctx;
let len = 0.67;
let angle = 45;
let variation = 0;
let rootLength = 100;
let iterations = 6;

const angleSlider = document.querySelector('#angle');
const lenSlider = document.querySelector('#len');
const variationSlider = document.querySelector('#variation');
const iterationsSlider = document.querySelector('#iterations');
const rootSlider = document.querySelector('#rootLength');

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


function init() {
    canvas = document.querySelector('#myCanvas');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, width, height);
    ctx.strokeStyle = 'rgba(255,255,255,1)'
    growTree(iterations, angle, len, variation);
    drawTree()
}

function growTree(iterations, angle, length, variation) {
    tree = [];
    let branchWidth = 6.0;
    let begin = new Vector(300,height);
    let end = new Vector(300,height - rootLength);
    let root = new Branch(begin, end, branchWidth);
    tree.push(root);
    for (let i = 0; i < iterations; i++) { 
        for (let i = tree.length - 1; i >=0; i--) {
            if(!tree[i].finished) {
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

function drawTree() {
    ctx.clearRect(0,0, width, height);
    for (let i = 0; i < tree.length; i++) {
        let branch = tree[i].drawBranch();
        ctx.beginPath();
        ctx.lineWidth = branch.thickness;
        ctx.moveTo(branch.startX, branch.startY);
        ctx.lineTo(branch.endX, branch.endY);
        ctx.stroke();
    }
}

function animate() {
    if (!drawed) {
        branch(len);
    }
    requestAnimationFrame(animate);
}


function invertAngle(angle) {
    return (angle + Math.PI) % (2 * Math.PI);
}

function degreeToRadians(degree) {
    return degree * (Math.PI / 180);
}



window.addEventListener('load', init);
