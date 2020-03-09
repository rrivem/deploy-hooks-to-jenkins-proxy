require('./dotenv');

const config = {
	port: process.env.PORT,
	jenkins: {
		host: process.env.JENKINS_HOST,
		projectName: process.env.PROJECT_NAME,
		buildName: process.env.BUILD_NAME
	}
};

module.exports = config;
