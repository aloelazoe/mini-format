import fs from 'fs';
import minifier from 'html-minifier';
import uglify from 'uglify-js';

const fsp = fs.promises;
const minifyHTML = minifier.minify;
const minifyJS = uglify.minify;

async function build() {
	var script = await fsp.readFile('./src/main.js', 'utf8');
	var sourceHTML = await fsp.readFile('./template/template.html', 'utf8');
	var format = await fsp.readFile('./template/format.js', 'utf8');

	script = minifyJS(script).code;
	// replace double quotes with escaped double quotes
	// so that they won't break everything when inserted in format.js
	// have to do this after minify because otherwise it will break
	script = script.replace(/"/g, '\\' + '"');

	sourceHTML = sourceHTML.replace('{{SCRIPT}}', script);
	sourceHTML = minifyHTML(sourceHTML, {
		removeAttributeQuotes: true,
		collapseWhitespace: true
	});

	format = format.replace('{{SOURCE}}', sourceHTML);

	await fsp.writeFile('./dist/format.js', format);
}

build()
	.then(() => console.log('[*^ ‿ ^*]'))
	.catch(err => console.error('[ ಡ ﹏ ಡ ]\n', err));