class Memory {
    constructor() {
        this.items = {}
        this.expires = {}
    }
    get(key, cb) {
        let value = this.items[key] || null
        if (cb) cb(null, value)
        return value
    }
    set(key, value, cb) {
        this.items[key] = value
        if (cb) cb(null)
    }
    del(key, cb) {
        if (key in this.items) {
            delete this.items[key]
        }
        if (key in this.expires) {
            this.expires.stop()
            delete this.expires[key]
        }
        if (cb) cb(null)
    }
    clear(cb) {
        let t = this
        this.items = {}
        Object.keys(this.expires).forEach(function(key) {
            t.expires[key].stop()
        })
        t.expires = {}
        
        if (cb) cb(null)
    }
    end() {
        this.clear()
    }
    expire(key, expire) {
        if (key in this.expires) {
            this.expires[key].stop()
            delete this.expires[key]
        }

        if (expire > 0) {
            this.expires[key] = new Expires(this, key, expire)
        }
        
    }
}

class Expires {
    constructor(memory, key, expire) {
        this.memory = memory
        this.key = key
        this.expire = expire
        this.timer = null
        this.start()
    }
    start() {
        let t = this
        this.timer = setTimeout(function() {
            t.timer = null
            t.module.del(key)
        }, this.expire)
    }
    stop() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

}

module.exports = new Memory()