
var redis = require('./redis')

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
    }
}