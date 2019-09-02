// see https://log4js-node.github.io/log4js-node/index.html
var log4js = require('log4js');

log4js.configure({
    appenders: {
      out: { type: 'stdout' },
      app: { type: 'file', filename: 'zb-ms.log', maxLogSize: 10485760, backups: 3, compress: true }
    },
    categories: {
      default: { appenders: [ 'out', 'app' ], level: 'debug' }
    }
  });
  
 const logger = log4js.getLogger();
logger.level = 'debug'; // default level is OFF - which means no logs at all.
logger.debug("Test debug message...");

module.exports = logger