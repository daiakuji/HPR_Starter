module.exports = [
  {
    register: require('crumb'),
    options: {
      cookieOptions: {
        isSecure: true
      }
    }
  },
  require('scooter'),
  require('inert')
];