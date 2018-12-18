// Include awsIoT SDK
const awsIoT = require('aws-iot-device-sdk');

// Include config
const config = require('./config.js');

// Include path
const path = require('path');

const deviceParams = {
	host: config.host,
	keyPath: config.key,
	certPath: config.cert,
	caPath: config.ca,
	clientId: config.clientId,
	region: config.AWS.region
};

const jobs = awsIoT.jobs(deviceParams);

jobs.on('connect', () => {
	jobs.subscribe('Garage');
});

jobs.on('message', (topic, payload) => {
	var payload = JSON.parse(payload.toString());

	console.log(payload);

	if(topic === 'Garage') {
		console.log(payload.operation);
	}
});

jobs.subscribeToJobs(deviceParams.clientId, (err, job) => {
	if (err) {
		console.log("Error: " + err);
	} else {
		console.log("New custom job with jobId: " + job.id.toString());

		job.inProgress();
		console.log("Completing the job!");
		job.succeeded();
	}
});

jobs.startJobNotifications(deviceParams.clientId, (err) => {
	if (err) {
		console.log("Error: " + err);
	} else {
		console.log("Job notifications started for thing: " + deviceParams.clientId);
	}
});
