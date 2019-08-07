import fs from 'fs';
import minifier from 'html-minifier';
import uglify from 'uglify-js';
import { bundle } from './bundle';

const fsp = fs.promises;
const minify = minifier.minify;
const minifyJS = uglify.minify;

async function build() {
	// TODO: figure out promises and make sure parts that don't interfere can run at the same time
	const script = await bundle('./src/main.js');
	var sourceHTML = await fsp.readFile('./template/template.html', 'utf8');

	// minifyJS doesn't work with es6 syntax
	// TODO: use uglify preferably as an html-minifier option after integrating babel transpiler
	// var uglifyResult = minifyJS(script);
	// if (uglifyResult.error) throw uglifyResult.error;
	// console.log(uglifyResult.code);
	sourceHTML = sourceHTML.replace('{{SCRIPT}}', script);
	sourceHTML = minify(sourceHTML, {
		// minifyJS: true,
		collapseWhitespace: true
	});

	// copy some info from package.json
	var pkg = JSON.parse(fs.readFileSync('package.json'));
	var formatData = {
		author: '<a href="https://twitter.com/aloelazoe">Elkie Nova</a>',
		description: pkg.description,
		// image: 'icon.svg',
		name: pkg.name,
		proofing: false,
		version: pkg.version,
		url: pkg.repository,
		source: sourceHTML
	};

	// build format.js to be used by twine for exporting stories
	// writing as json will make sure all quotes in the source html property
	// are properly escaped and won't break the resulting javascript file
	await fsp.writeFile(
		'./dist/format.js',
		'window.storyFormat(' + JSON.stringify(formatData) + ');'
	);
	// also write javascript separately for testing
	await fsp.writeFile('./dist/main.js', script);
}

build()
	.then(() => console.log('[*^ ‿ ^*]'))
	.catch(err => console.error('[ ಡ ﹏ ಡ ]\n', err));
