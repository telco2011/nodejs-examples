//File: utils/tools.js
module.exports = {
	printError: function (err) {
	    try {
	        console.log('[ERROR : ' + err.name + ']');
	        console.log('[MESSAGE : ' + err.err + ']');
	        console.log('[CODE : ' + err.code + ']');
	    } catch (e) {
	        console.log(err);
	    }
	},
	errorMessage: function(code) {
	    var errorMap = { '11000' : 'Clave duplicada.' };
	    
	    return '[ERROR] ' + errorMap[code];
	}
};