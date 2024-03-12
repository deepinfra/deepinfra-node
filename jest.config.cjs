/** @type {import('ts-jest').JstConfigWithTsJest} */
module.exports = {
	testEnvironment: 'node',
	extensionsToTreatAsEsm: [".ts"],
	testTimeout: 10000,
	coveragePathIgnorePatterns: [
		"/node_modules/",
		"/examples/",
		"/test/"
	]
};
