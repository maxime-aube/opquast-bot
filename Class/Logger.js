const winston = require('winston');
require('winston-daily-rotate-file');
const dotenv = require('dotenv');

dotenv.config();

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss Z'
        }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: 'combined-%DATE%.log',
            dirname: './logs',
            datePattern: 'DD-MM-YYYY',
            maxFiles: '30d',
            level: 'warn'
        }),
        new winston.transports.DailyRotateFile({
            filename: 'error-%DATE%.log',
            dirname: './logs',
            datePattern: 'DD-MM-YYYY',
            maxFiles: '30d',
            level: 'error'
        })
    ],
    exceptionHandlers: [
        new winston.transports.DailyRotateFile({
            filename: 'exception-%DATE%.log',
            dirname: './logs',
            datePattern: 'DD-MM-YYYY',
            maxFiles: '30d'
        })
    ],
    rejectionHandlers: [
        new winston.transports.DailyRotateFile({
            filename: 'rejection-%DATE%.log',
            dirname: './logs',
            datePattern: 'DD-MM-YYYY',
            maxFiles: '30d'
        })
    ]
});

// log file rotations
logger.transports.forEach(transport => {
    transport.on('rotate', function(oldFilename, newFilename) {
        logger.info('switched log file', {
            oldFileName : oldFilename,
            newFileName : newFilename
        });
    });
});

// console.log(`with level ${logger.level}`);
// logger.error('une erreur', {
//     tag: 'some stuff',
//     otherTag: 'more stuff'
// });
// logger.warn('un warning');
// logger.info('une info');
// logger.verbose('un verbose un verbose un verbose un verbose un verbose...');
// logger.debug('un debug');
// logger.silly('un silly');

module.exports = logger;