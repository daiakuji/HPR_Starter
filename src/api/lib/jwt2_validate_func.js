/**
 * validate follows the standard format for hapi-auth-jwt2
 * we expect the decoded JWT to have a 'sid' key which has a valid session id.
 * If the sid is in the sessions table of the database and end_timestamp has
 * not been set, (i.e. null), we know the session is valid.
 */
module.exports = function validate (decoded, request, callback) {
  
    // do your checks to see if the person is valid
	console.log(' - - - - - - - >', request.method);
	console.log(" - - - - - - - DECODED token:");
	console.log(decoded);
	
	return callback(null,true);
};