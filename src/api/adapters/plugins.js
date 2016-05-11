module.exports = [
  {
    register: require('crumb'),
    options: {
      cookieOptions: {
        isSecure: true
      }
    }
  },
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
		host: process.env.ServerHost+':'+process.env.ServerPort			
	
	}
  },
  require('scooter'),
  require('inert')
];