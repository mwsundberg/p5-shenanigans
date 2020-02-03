'use strict';
const {src, dest, series, parallel, watch} = require('gulp');
const pug = require('pug');
const path = require('path');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const through2 = require('through2');
const rename = require('gulp-rename');

// Code for the pug template
const pugTemplatePath = "template.pug";
let pugTemplate = pug.compileFile(pugTemplatePath);

function buildHTML(path) {
	return src("*/info.json")
		.pipe(through2.obj(function(file, _, cb) {
			// Inline template to build a HTML file from the info.json
			if(file.isBuffer()){
				const pugResults = pugTemplate({
					// Populate the object passed to pug with all of the info.json data
					...(JSON.parse(file.contents.toString())),
					// Get the directory name relative to the base folder (with the info.json removed)
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
		.pipe(babel({
            presets: ['@babel/env']
        }))
		.pipe(uglify())
		.pipe(rename(function(path) {
			// Add a .min. into the js name
			path.basename = "sketch";
			path.extname = ".min.js";
			}))
		.pipe(dest("."));
}

exports.buildAll = parallel(buildHTML, buildJs);

exports.watchAll = function () {
	// Build once
	exports.buildAll();

	// Update the pug template if it changes
	watch(pugTemplatePath, series(function(cb){
		pugTemplate = pug.compileFile(pugTemplatePath);
		cb();
	}, buildHTML));

	// Update html processing
	watch("*/info.json", buildHTML);

	// Update js processing
	watch(["**/*.js", "!node_modules/*", "!**/*.min.js"], buildJs);
}