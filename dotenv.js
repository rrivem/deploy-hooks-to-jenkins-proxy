const path = require('path');

function configureDotEnv() {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		require('dotenv').config({ path: path.resolve(__dirname, '.env') });
	}
}

configureDotEnv();
