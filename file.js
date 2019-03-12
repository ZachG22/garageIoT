const path = require('path');
const fs = require('fs');

const writeFile = (filePath, content) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filePath, content, (err) => {
			if(err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

const readFile = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, (err, data) => {
			if(err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports = {
	writeFile: writeFile,
	readFile: readFile
}
