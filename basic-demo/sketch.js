function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	canvas.parent('sketch');
	background(255, 128, 128);
}

function draw() {
	ellipse(mouseY, mouseX, 80, 80);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(255, 128, 128);
}
