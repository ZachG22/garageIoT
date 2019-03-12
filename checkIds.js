const path = require('path');
const file = require('./file.js');
const fileName = path.join(__dirname, "jobIds.txt");


const isUniqueId = async (jobId) => {
	// Declare array
	var array = [];
	
	// Attempt to read file contents first
	console.log("Reading " + fileName + " now: \n");
	try {
		const contents = await file.readFile(fileName);
		array = JSON.parse(contents);
		console.log(array);
	} catch(err) {
		console.log(err);
	}

	console.log("Writing now: \n");
	try {
		if(!array.includes(jobId)) {
			array.push(jobId);
			console.log(array);
			const string = JSON.stringify(array);
			await file.writeFile(fileName, string);
			return true;
		} else {
			return false;
		}
	} catch(err) {
		console.log(err);
	}
};

module.exports = {
	isUniqueId: isUniqueId
}
