/**
 * # redis.js
 *
 * This is the configuration for Redis 
 *
 */
'use strict';
/**
 * ## Imports
 *
 */
var redis = require('redis'),
    config = require('config'),
    redisClient = {};

var connection_string = config.get('Redis.connection');

//running locally - make sure you've started redis server
redisClient = Redis.createClient(connection_string);    

module.exports = redisClient;