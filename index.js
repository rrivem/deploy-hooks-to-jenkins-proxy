const express = require('express');
const bodyParser = require('body-parser');
const http = require('request-promise');

const logger = require('./logger');
const { basicAuthorizationHeader, encodeCredentials } = require('./helpers');
const credentials = require('./credentials.json');
const {
	port,
	jenkins: { host, projectName, buildName }
} = require('./config');
const buildUrl = `http://${host}/job/${projectName}/${buildName}`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/deploy', async (request, response) => {
	try {
		logger.info('deploy hook %j', request.body);
		const { user, ...query } = request.body;
		const options = {
			method: 'POST',
			json: true,
			uri: buildUrl,
			qs: query,
			headers: {
				authorization: basicAuthorizationHeader(encodeCredentials(credentials[user], user))
			}
		};
		logger.info('Calling Jenkins with %j', options);

		const res = await http(options);
		response.send(res).end();
	} catch (err) {
		logger.error('Error processing deploy %j', err);
		response
			.status(err.status)
			.send(err.message)
			.end();
	}
});

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
