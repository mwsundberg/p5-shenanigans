function setup() {
	let canvas = standardCanvas();
}

function draw() {
    ellipse(mouseY, mouseX, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function circlePoints(centerX, centerY, radius, theta) {
    
}

function standardCanvas(){
	// Make a canvas and pre-populate it with some default settings
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	canvas.background(255, 128, 128);
	canvas.parent('sketch');
	return canvas;
}