var program = require('commander'),
	fs = require('fs'),
	https = require('https'),
	util = require('util');

program.version('0.1.0')
    .option('-f, --force', 'Force overwrite of current .gitignore if it already exists')
    .option('-a, --append', 'Append to current .gitignore if it already exists')
    .option('-d, --dir [dir]', 'Directory to download into. Defaults to current directory', false)
    .parse(process.argv);

var ignoreUrl = "https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore";
var ignoreFile = '.gitignore';

if (program.dir) {
	ignoreFile = program.dir + ignoreFile;
}

function getGitignore(fileName, url, append) {
	var options = {
		flags: append ? 'a' : 'w',
		encoding: 'utf8',
		mode: "0744"
	};
	console.log("Downloading and appending gitignore to " + fileName);
	stream = fs.createWriteStream(fileName, options);
	if (append) {
		// If appending, add an extra newline between old and new content
		stream.write("\n", function() {
			downloadUrl(stream, url);
		});
	} else {
		downloadUrl(stream, url);
	}
}

function downloadUrl(stream, url) {
	if (stream) {
		https.get(ignoreUrl, function(res) {
			res.on('data', function(data) {
				stream.write(data);
			}).on('end', function() {
				stream.end();
				console.log('Finished downloading .gitignore');
			});
		});
	} else {
		console.error("Oops. Provided stream doesn't exist");
	}
}

fs.exists(ignoreFile, function(exists) {
	if (exists) {
		if (!program.append && !program.force) {
			var messageStr = 'File %s already exists %s\nUse the --force or --append flags to override this warning';
			console.log(util.format(messageStr, ignoreFile, program.dir ? '' : 'in the current folder'));
			process.exit(1);
		}
	}
	
	getGitignore(ignoreFile, ignoreUrl, program.append);
});