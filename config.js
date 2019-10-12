const Config = {
    dev: {
        port: 9090,
        mongodb: 'mongodb://127.0.0.1/zbms-test',
        // cache: 'redis', //use momery
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: ''
        }
    },
    production: {
        port: 9090,
        mongodb: 'mongodb://127.0.0.1/zbms',
        cache: 'redis',
        redis: {
            host: '127.0.0.1',
            port: 6379,
            password: ''
        }
    }    
}

module.exports = process.env.NODE_ENV == 'production' ? Config.production : Config.dev