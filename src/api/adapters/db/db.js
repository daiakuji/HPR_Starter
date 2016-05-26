var massive = require("massive");
var routes = require("./../../routes/dbRoutes");

var connectionString = "postgres://"+process.env.DBuser+":"+process.env.DBpassword+"@"+process.env.DBhost+":"+process.env.DBport+"/"+process.env.DB;


exports.register = function(server, options, next) {
	var db = massive.connectSync({connectionString : connectionString});

	server.bind({
		db: db
	});
	
	server.route(routes);
	next();
}

exports.register.attributes = {
    pkg: require("./package.json")
};		
