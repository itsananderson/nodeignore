var fs = require('fs'),
	https = require('https'),
	util = require('util');

var ignoreUrlFormat = "https://raw.githubusercontent.com/github/gitignore/master/%s.gitignore";
var globalIgnoreUrlFormat = "https://raw.githubusercontent.com/github/gitignore/master/Global/%s.gitignore";

function getIgnoreUrl(name) {
	return util.format(ignoreUrlFormat, name);
}

function getGlobalIgnoreUrl(name) {
	return util.format(globalIgnoreUrlFormat);
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
		https.get(url, function(res) {
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

module.exports = {
	getIgnoreUrl: getIgnoreUrl,
	getGlobalIgnoreUrl: getGlobalIgnoreUrl,
	getGitignore: getGitignore
}