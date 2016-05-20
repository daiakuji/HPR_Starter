//Add all the routes related to Auth Plugin here.
var Handler = require('./../handlers');
module.exports = [{
    path: "/auth/facebook",
    method: "GET",
    config: {
            auth: {
                strategy: 'facebook',
                mode: 'try'
            },
			handler: Handler.authUser	   }

},  {
        method: '*',
        path: '/auth',
        config: {
            auth: false
            },
			handler: Handler.authUser	
},	{
		method: ['GET','POST'], 
		path: "/logout", 
		config: { auth: false },
		handler: Handler.logOutUser
    }
];