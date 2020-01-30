function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('display', 'block');
    background(255, 128, 128);
    canvas.parent('sketch');
}

function draw() {
    ellipse(mouseY, mouseX, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function circlePoints(centerX, centerY, radius, theta) {
    
}
