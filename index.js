const express = require('express');
const bodyParser = require('body-parser');
const http = require('request-promise');

const logger = require('./logger');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8079;
const buildUrl = 'http://172.20.3.193:8080/job/members-portal-automation/buildWithParameters';

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
