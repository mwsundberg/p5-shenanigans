function setup() {
	var canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	canvas.parent('sketch');
}

const STEP = 1 / 10;
function draw() {
	// Colors
	background(255, 128, 128);
	stroke(255);

	// Points
    let points = [{x: windowWidth * 0.2, y: windowHeight / 2}, {x: mouseX, y: mouseY}, {x: windowWidth * 0.8, y: windowHeight / 2}];

    // Main Lines
    strokeWeight(4);
    for(let i = 0; i < points.length - 1; i++){
		line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
	}

    // Sub Lines
    strokeWeight(1.5);
    for(let step = STEP; step < 1; step += STEP){
    	line(lerp(points[0].x, points[1].x, step),
    		lerp(points[0].y, points[1].y, step),
    		lerp(points[1].x, points[2].x, step),
    		lerp(points[1].y, points[2].y, step));
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}