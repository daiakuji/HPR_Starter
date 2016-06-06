var moment = require('moment')

var apiConn = process.env.APIHost+':'+process.env.APIPort
var filename = moment().format("YYYYMMDDhhmmss")

module.exports = [
 /* {
    register: require('crumb'),
    options: {
		restful: true,
		cookieOptions: {
		isSecure: false
		}
    }
  },*/
  {
	register: require('hapi-swagger'),
	options: {
		info: {
			title: 'Test API Documentation',
			version: '1.0',
            contact: {
				name: 'Leo Hong',
				email: 'email@here.com'
			}
		},
		schemes: ['http'],
		host: apiConn
	
	}
  },
  require('scooter'),
  require('inert'),
  require('hapi-auth-jwt2'),
  require('bell'),
  require('vision'),
  require('./db/db'),
  require('./auth/auth'),
    {
	register: require('good'),
	    options: {
		ops: {
			interval: 1000
		},
		reporters: {
			console: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ log: '*', response: '*' }]
			}, {
				module: 'good-console'
			}, 'stdout'],
			file: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ ops:'*',error:'*',log: '*', response: '*' }]
			}, {
				module: 'good-squeeze',
				name: 'SafeJson'
			}, {
				module: 'good-file',
				args: ['./../../logs/'+filename+'.log']
			}],
			http: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{ error: '*' }]
			}, {
				module: 'good-http',
				args: ['http://'+apiConn+'/logs', {
					wreck: {
						headers: { 'x-api-key': 12345 }
					}
				}]
			}]
		}
    }	
  }
];