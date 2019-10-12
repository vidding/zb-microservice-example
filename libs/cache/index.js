const Config = require('../../config')

let redis

if (Config.cache == 'redis') {
    redis = require('./redis')
} else {
    redis = require('./memory')
}

module.exports = {
    get: function(key, cb) {
        return redis.get(key, cb)
    },
    set: function(key, value, expire, cb) {
        var ret = redis.set(key, value,  cb)
        redis.expire(key, expire)
        return ret
    },
    del: function(key, cb) {
        return redis.del(key, cb)
    },
    clear: function(cb) {
        return redis.clear(cb)
    },
    end: function() {
        return new Promise((resolve, reject) => {
            redis.end(true);
            resolve(true);
        })
    }
}