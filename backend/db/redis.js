var redis = require("redis");

var redisClient = redis.createClient(6379, "13.56.157.62");

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});