import fs from 'fs';
import minifier from 'html-minifier';
import { bundle } from './bundle-js';

const fsp = fs.promises;
const minify = minifier.minify;

async function build() {
	var script = await bundle('./src/main.js');
	var sourceHTML = await fsp.readFile('./template/template.html', 'utf8');

	sourceHTML = sourceHTML.replace('{{SCRIPT}}', script);
	sourceHTML = minify(sourceHTML, {
		minifyJS: true,
		collapseWhitespace: true
	});

	// copy some info from package.json
	var pkg = JSON.parse(fs.readFileSync('package.json'));
	var formatData = {
		author: '<a href="https://twitter.com/aloelazoe">Elkie Nova</a>',
		description: pkg.description,
		image: 'icon.svg',
		name: pkg.name,
		proofing: false,
		version: pkg.version,
		// url: TODO,
		source: sourceHTML
	};

	// writing as json will make sure all quotes in the source html property
	// are properly escaped and won't break the resulting javascript file
	fs.writeFileSync(
		'./dist/format.js',
		'window.storyFormat(' + JSON.stringify(formatData) + ');'
	);
}

build()
	.then(() => console.log('[*^ ‿ ^*]'))
	.catch(err => console.error('[ ಡ ﹏ ಡ ]\n', err));