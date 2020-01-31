'use strict';
const {src, dest, series, parallel, watch} = require('gulp');
const pug = require('pug');
const path = require('path');
const uglify = require('gulp-uglify');
const through2 = require('through2');
const rename = require('gulp-rename');

// Compile the pug template
const pugTemplate = pug.compileFile("template.pug");

function buildPug(path) {
	return src("*/info.json")
		.pipe(through2.obj(function(file, _, cb) {
			// Inline template to build a HTML file from the info.json
			if(file.isBuffer()){
				const pugResults = pugTemplate({
					...(JSON.parse(file.contents.toString())),
					gitPath: file.relative.slice(0, -("info.json".length))
				});
				file.contents = Buffer.from(pugResults);
			} else {
				console.log("Oh Crap, didn't receive a buffer from the thingamabob.");
			}
			cb(null, file);
		}))
		.pipe(rename(function(path) {
			path.basename = "index";
			path.extname = ".html";
			}))
		.pipe(dest("."));
}


function buildJs(jsonFile, callback){
	return src("*/sketch.js")
		.pipe()
		.pipe(uglify())
		.pipe(rename(function(path) {
			// Add a .min. into the js name
			path.basename = "sketch";
			path.extname = ".min.js";
			}))
		.pipe(dest("."));
}

exports.buildAll = parallel(buildPug);