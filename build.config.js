import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	entries: ['./src/index'],
	outDir: 'dist',
	declaration: true,
	clean: true,
	failOnWarn: true,
	rollup: {
		emitCJS: true,
		esbuild: {
			minify: process.env.NODE_ENV === 'production'
		},
	},
});
