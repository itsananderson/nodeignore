#!/usr/bin/env node

var program = require('commander'),
	pkg = require('../package.json'),
	fs = require('fs'),
	https = require('https'),
	path = require('path'),
	util = require('util')
	nodeignore = require('../');

program.version(pkg.version)
	.option('-f, --force', 'Force overwrite of current .gitignore if it already exists')
	.option('-a, --append', 'Append to current .gitignore if it already exists')
	.option('-d, --dir [dir]', 'Directory to download into. Defaults to current directory', false)
	.option('-n, --name [name]', 'What to name the local file. Defaults to .gitignore', '.gitignore')
	.option('-l, --language [language]', 'Language for which to download the .gitignore', 'Node')
	.option('-g, --global', 'Flag to download a global, rather than language specific .gitignore. Best when paired with --language', false)
	.parse(process.argv);

var ignoreFile = program.name;

if (program.dir) {
	if (!fs.existsSync(program.dir)) {
		console.error(util.format("ERROR: Directory '%s' doesn't exist", program.dir));
		process.exit(1);
	}
	ignoreFile = path.join(program.dir, program.name);
}

fs.exists(ignoreFile, function(exists) {
	if (exists) {
		if (!program.append && !program.force) {
			var messageStr = 'File %s already exists %s\nUse the --force or --append flags to override this warning';
			console.error(util.format(messageStr, ignoreFile, program.dir ? '' : 'in the current folder'));
			process.exit(1);
		}
	}
	
	var ignoreUrl;
	if (program.global) {
		ignoreUrl = nodeignore.getGlobalIgnoreUrl(program.language);
	} else {
		ignoreUrl = nodeignore.getIgnoreUrl(program.language);
	}
	nodeignore.getGitignore(ignoreFile, ignoreUrl, program.append);
});
