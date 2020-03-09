const express = require('express');
const bodyParser = require('body-parser');
const http = require('request-promise');

const logger = require('./logger');
const {
	port,
	jenkins: { host, projectName, buildName }
} = require('./config');
const buildUrl = `http://${host}/job/${projectName}/${buildName}`;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/deploy', (request, response) => {
	logger.info('deploy hook %j', { params: request.body });
	const { user, ...query } = request.body;
	const options = {
		method: 'POST',
		json: true,
		uri: buildUrl,
		qs: query
	};

	http(options).then(res => {
		response.send(res);
		response.end();
	});
});

app.listen(port, () => {
	logger.info(`Listening on port ${port}`);
});
