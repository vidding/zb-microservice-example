const Mali = require('mali')
const logger = require('@malijs/logger')
const Config = require('./config')
const Routers = require('./routers')
const log = require('./log')


// 初始化服务
function initService() {
    return new Promise(function (resolve, reject) {
        // do some init ...
        resolve(true)
    })
}

function main() {
    try {
        log.info('Service is starting...')
        await initService();

        const app = new Mali('echo.proto')
        app.use(logger({
            timestamp: logger.isoTime
        }))
        app.use(Routers)
        app.on('error', (err, ctx) => {
            log.error('server error for call %s of type %s', ctx.name, ctx.type, err);
        })
        app.start('0.0.0.0:' + Config.port)
        let HOSTPORT = '0.0.0.0:' + Config.port
        app.start(HOSTPORT)
        log.info(`Service running @ ${HOSTPORT}`)
    } catch (e) {
        log.error(e)
    }
}

// 服务关闭
async function shutdown(err) {
    if (err) log.error(err)

    await stopSomeRes()
    await app.close()

    log.info("Service is shutdown.")
    process.exit()
}

// 关闭其它
async function stopSomeRes() {
    return new Promise(async (resolve, reject) => {
        // 停止Redis
        await require('./libs/cache/index').end()
        log.info("stop MongoDB")

        // 停止MongoDB
        await require('./db/index').disconnect()
        log.info("stop Redis")

        resolve()
    })
}

// 服务退出信息监听
process.on('uncaughtException', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

// 启动主函数
main()