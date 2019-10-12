const Log = require('../log')
const JSONStream = require('JSONStream')
const fs = require('fs')


const {
    Transform
} = require('stream');

// 转换流也是双工流。
const myTransform = new Transform({
    writableObjectMode: true,
    readableObjectMode: true,

    transform(chunk, encoding, callback) {
        // 适当对chunk进行转换
        callback(null, chunk);
    }
});

async function echo(ctx) {
    Log.debug('echo', ctx.req)
    ctx.res = {
        message: 'Hello '.concat(ctx.req.message)
    }
}

async function echoAbort(ctx) {
    ctx.res = {}
}

async function noOp(ctx) {
    ctx.res = {}
}

async function serverStreamingEcho(ctx) {
    // 流模式

    // 读取文件
    // fs
    // .createReadStream('messages.json')
    // .pipe(JSONStream.parse('*'))

    // 使用 全双工对象流模式
    ctx.res = myTransform

    myTransform.write({
        message: '111'
    })
    setTimeout(function () {
        myTransform.write({
            message: '222'
        })
    }, 1000)
    setTimeout(function () {
        myTransform.write({
            message: '333'
        })
    }, 2000)
    setTimeout(function () {
        myTransform.write({
            message: '444'
        })
    }, 5000)
}

async function serverStreamingEchoAbort(ctx) {
    ctx.res = {}
}

async function clientStreamingEcho(ctx) {
    ctx.res = {}
}

async function fullDuplexEcho(ctx) {
    ctx.req.on('data', d => ctx.res.write({
        message: d.message.toUpperCase()
    }))
    ctx.req.on('end', () => ctx.res.end())
}

async function halfDuplexEcho(ctx) {
    ctx.res = {}
}

module.exports = {
    echo,
    echoAbort,
    noOp,
    serverStreamingEcho,
    serverStreamingEchoAbort,
    clientStreamingEcho,
    fullDuplexEcho,
    halfDuplexEcho
}