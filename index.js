const canvas = document.querySelector('#myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

let size = 50;
let x = -size;
let y = 0;
let speed = 10;

function animate() {
    ctx.clearRect (0, 0, width, height);
    x += speed;
    if (x > width) {
        y += 50;
        x = -size;
    }
    if (y > height - size) {
        y = 0;
    }
    requestAnimationFrame(animate);
    ctx.fillRect(x,y,size,size);
}

requestAnimationFrame(animate);