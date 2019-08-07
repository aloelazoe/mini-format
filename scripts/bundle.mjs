import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babelRoll from "rollup-plugin-babel";

export async function bundle(src = '') {
	const inputOptions = {
		input: src,
		plugins: [
			babelRoll({
				exclude: 'node_modules/**'
			}),
			nodeResolve(),
			commonjs(),
		]
	};

	const outputOptions = {
		format: "iife",
		output: {
			file: './dist/main.js'
		}
	};

	const bundle = await rollup.rollup(inputOptions);
	const { output } = await bundle.generate(outputOptions);

	// write bundle separately for testing
	await bundle.write(outputOptions);

	return output[0].code;
}
