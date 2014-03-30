#!/usr/bin/env node

var program = require('commander'),
	fs = require('fs'),
	https = require('https'),
	path = require('path'),
	util = require('util')
	nodeignore = require('../');

program.version('0.1.1')
    .option('-f, --force', 'Force overwrite of current .gitignore if it already exists')
    .option('-a, --append', 'Append to current .gitignore if it already exists')
    .option('-d, --dir [dir]', 'Directory to download into. Defaults to current directory', false)
    .parse(process.argv);

var ignoreFile = '.gitignore';

if (program.dir) {
	if (!fs.existsSync(program.dir)) {
		var errorStr = "ERROR: Directory '%s' doesn't exist";
		console.error(util.format(errorStr, program.dir));
		process.exit(1);
	}
	ignoreFile = path.join(program.dir, ignoreFile);
}

fs.exists(ignoreFile, function(exists) {
	if (exists) {
		if (!program.append && !program.force) {
			var messageStr = 'File %s already exists %s\nUse the --force or --append flags to override this warning';
			console.error(util.format(messageStr, ignoreFile, program.dir ? '' : 'in the current folder'));
			process.exit(1);
		}
	}
	
	nodeignore.getGitignore(ignoreFile, nodeignore.getIgnoreUrl('Node'), program.append);
});