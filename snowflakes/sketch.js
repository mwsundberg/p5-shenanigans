function setup() {
	const canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('display', 'block');
	canvas.parent('sketch');
	angleMode(RADIANS);
	noLoop();
}

const heightPercent = 0.5;
const widthPercent = 0.66;
const rows = 2;
const cols = 3;

function draw() {
	background(255, 128, 128);

	// Calculate locations
	const effectiveWidth = windowWidth * widthPercent;
	const effectiveHeight = windowHeight * heightPercent;
	translate(windowWidth * (1 - widthPercent)/2, windowHeight * (1 - heightPercent)/2);

	noFill();

	// Make snowflakes
	for(const x of range(cols)){
		for(const y of range(rows)){
			// Isolate the transformation
			push();

			const outerRadius = random(75, 200);
			translate(x * effectiveWidth/(cols - 1), y * effectiveHeight/(rows - 1));

			// Draw a few snowflakes overlapping
			for(const i of range(random(4, 15))){
				stroke(255 - i * 10);
				strokeWeight(random(1, 10));

				// Draw the snowflake itself
				drawSnowFlake(
					outerRadius,
					random(10, 70),
					random(0, TWO_PI),
					random(0, TWO_PI));
			}
			pop();
		}
	}
}

// Small helper for a natural range function
function range(end) {
	return [...Array(floor(end)).keys()];
}

function rThetaToX(r, theta){
	return r*cos(theta);
}
function rThetaToY(r, theta){
	return r*sin(theta);
}


function drawSnowFlake(outerRadius, innerRadius, theta1, theta2){
	// Relocate the origin so drawing effectively from the upper left corner
	push();
	bezier(rThetaToX(outerRadius, theta1), rThetaToY(outerRadius, theta1),
		rThetaToX(innerRadius, theta1), rThetaToY(innerRadius, theta1),
		rThetaToX(innerRadius, theta2), rThetaToY(innerRadius, theta2),
		rThetaToX(outerRadius, theta2), rThetaToY(outerRadius, theta2));
	pop();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
