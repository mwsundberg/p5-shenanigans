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
	background(20);

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
			const numSnowflakes = random(4, 15);
			for(const i of range(numSnowflakes)){
				stroke(255 - i * 200 / numSnowflakes);
				strokeWeight(random(1, 10));

				// Draw the snowflake itself
				drawSnowFlake(
					outerRadius,
					random(10, 70),
					random(0, TWO_PI),
					random(PI / 16, PI));
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


function drawSnowFlake(outerRadius, innerRadius, theta, width){
	const leftTheta = theta + width/2;
	const rightTheta = theta - width/2;
	// The
	bezier(rThetaToX(outerRadius, leftTheta), rThetaToY(outerRadius, leftTheta),
		rThetaToX(innerRadius, leftTheta), rThetaToY(innerRadius, leftTheta),
		rThetaToX(innerRadius, rightTheta), rThetaToY(innerRadius, rightTheta),
		rThetaToX(outerRadius, rightTheta), rThetaToY(outerRadius, rightTheta));
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
