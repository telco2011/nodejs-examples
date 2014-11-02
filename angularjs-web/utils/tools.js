//File: utils/tools.js
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/tools.log', category: 'tools' }
  ]
});

var logger = log4js.getLogger('tools');

module.exports = {
	printError: function (msg, err) {
	    try {
	    	if (msg) {
	    		logger.error(msg);
	    	}
	        logger.error(err);
	    } catch (e) {
	        logger.error(e);
	    }
	},
	errorMessage: function(code) {
	    var errorMap = { '11000' : 'Clave duplicada.' };
	    
	    return '[ERROR] ' + errorMap[code];
	}
};