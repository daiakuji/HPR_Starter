/**
 * validate follows the standard format for hapi-auth-jwt2
 * we expect the decoded JWT to have a 'sid' key which has a valid session id.
 * If the sid is in the sessions table of the database and end_timestamp has
 * not been set, (i.e. null), we know the session is valid.
 */
module.exports = function validate (decoded, request, callback) {
	// Check if the JWT is still valid
	var currentTime = Math.floor((new Date().getTime())/1000);
	var timeLeft = decoded.exp - currentTime;
	
	var stillAlive = (decoded.exp>currentTime)
	
	
	// Check if the JWT is still valid
	if (stillAlive>0) // JWT has not yet expired
	{
		//Check the session is still valid in the DB
		
		return callback(null,true);	
	}
	else
	{
		return callback(null,false);
	}
};