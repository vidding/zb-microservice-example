const Mali = require('mali')
const Config = require('./config')
const Routers = require('./routers')
const log = require('./log')

function main() {
  try {
    const app = new Mali('echo.proto')
    app.use(async function logger (ctx, next) {
       const start = new Date()
       await next()
       const ms = new Date() - start
       log.debug('%s %s - %s', ctx.name, ctx.type, ms);
     })
    app.use(Routers)
    app.on('error', (err, ctx) => {
      log.error('server error for call %s of type %s', ctx.name, ctx.type, err);
   })
    app.start('0.0.0.0:' + Config.port)
  } catch(e) {
    log.error(e)
  }
}

main()
