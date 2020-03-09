const {
	createLogger,
	transports: { Console },
	format: { combine, colorize, timestamp, prettyPrint, splat, printf }
} = require('winston');

const consoleTransport = new Console({
	handleExceptions: true,
	json: false
});

const formatter = printf(({ level, message, timestamp, ...rest }) => {
	rest = Object.keys(rest).length === 0 ? '' : JSON.stringify(rest);
	return `${timestamp} ${level}: ${message} ${rest}`;
});

const logger = createLogger({
	format: combine(colorize(), timestamp(), prettyPrint(), splat(), formatter),
	transports: [consoleTransport]
});

module.exports = logger;
