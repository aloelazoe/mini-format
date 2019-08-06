import fs from 'fs';
import { bundle } from './bundle-js';

const fsp = fs.promises;

async function build() {
	var script = await bundle('./src/main.js');
	await fsp.writeFile('./dist/main.js', script);
}

build()
	.then(() => console.log('[*^ ‿ ^*]'))
	.catch(err => console.error('[ ಡ ﹏ ಡ ]\n', err));