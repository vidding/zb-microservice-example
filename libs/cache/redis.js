var redis = require('redis');
const Config = require('../../config');

// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient(Config.redis.port, Config.redis.host);

client.on("error", function(err) {
    console.log("Error " + err)
})

if (Config.redis.password) {
    client.auth(Config.redis.password);
}

// client.set('hello','This is a value');
// client.expire('hello',10) //设置过期时间
// client.exists('key') //判断键是否存在
// client.del('key1')
// client.get('hello');


module.exports = client