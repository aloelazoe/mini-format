import rollup from "rollup";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export async function bundle(src = '') {
	const inputOptions = {
		input: src,
		plugins: [
			nodeResolve(),
			commonjs()
		]
	};

	const outputOptions = {
		format: "iife"
	};

	const bundle = await rollup.rollup(inputOptions);
	const output = await bundle.generate(outputOptions);

	return output.output[0].code;
}
