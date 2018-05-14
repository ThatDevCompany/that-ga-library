import {BuildUtils} from 'that-build-library';

BuildUtils
	.exec('TESTING', 'nyc', [
		'--reporter', 'html',
		'--reporter', 'text',
		'--report-dir', './coverage',
		'--temp-directory', './coverage/tmp',
		'--exclude', 'src/*.spec.js',
		'--include', 'src/*.js',
		'node_modules/.bin/jasmine',
		'src/*.spec.js',
		'src/**/*.spec.js'
	])
	.subscribe();
