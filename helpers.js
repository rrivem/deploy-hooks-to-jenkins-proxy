function basicAuthorizationHeader(credentials) {
	return `Basic ${credentials}`;
}

function encodeCredentials(username, password) {
	return Buffer.from(`${username}:${password}`, 'utf-8').toString('base64');
}

module.exports = {
	basicAuthorizationHeader,
	encodeCredentials
};
