// Include awsIoT SDK
const awsIoT = require('aws-iot-device-sdk');

// Include config
const config = require('./config.js');

// Include file
const check = require('./checkIds.js');

// Include path
const path = require('path');

// Include shell
const shell = require('shelljs');
const setPinScript = 'bash ' + path.join(__dirname, 'setPin.sh');
const garageScriptCommand = 'bash ' + path.join(__dirname, 'garageScript.sh');

const deviceParams = {
	host: config.host,
	keyPath: config.key,
	certPath: config.cert,
	caPath: config.ca,
	clientId: config.clientId,
	region: config.AWS.region
};

// Set garagepin out
shell.exec(setPinScript);

const device = awsIoT.device(deviceParams);

device.on('connect', () => {
	console.log("Connected");
	device.subscribe('Garage');
});

device.on('message', async (topic, payload) => {
	var payload = JSON.parse(payload.toString());

	console.log(payload);

	if(topic === 'Garage') {
		try {
			const jobId = payload.id;
			console.log(jobId);
			if(check.isUniqueId(jobId)) {
				//shell.exec(garageScriptCommand);
				console.log("\nRunning " + jobId + "\n");
			}
		} catch(err) {
			console.log(err);
		}
	}
});
