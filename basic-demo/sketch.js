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

}

function circlePoints(centerX, centerY, radius, theta) {
    
}

function standardCanvas(){
	// Make a canvas and pre-populate it with some default settings
	
}