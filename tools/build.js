const fs = require('fs');
const del = require('del');
const process = require('child_process');

console.log('Deleting /dist folder');
del(['./dist/stubs/material*']).then(() => {

	console.log('Rolling up UMD');
	process.exec('rollup -c tools/rollup.config.umd.js', () => {

		console.log('Rolling up ESM');
		process.exec('rollup -c tools/rollup.config.esm.js', () => {

			console.log('Updating package.json version');
			let packageJson = JSON.parse(fs.readFileSync('./package.json').toString());
			let v = packageJson.version.split('.');
			v[2] = (parseInt(v[2]) + 1) + '';
			packageJson.version = v.join('.');
			fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

			console.log('Copying package.json file');
			delete packageJson.devDependencies;
			delete packageJson.scripts;
			fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));
			fs.writeFileSync('./dist/README.md', (fs.readFileSync('./README.md').toString()));
			fs.writeFileSync('./dist/LICENSE', (fs.readFileSync('./LICENSE').toString()));

			console.log('Done');

		});
	});
});


