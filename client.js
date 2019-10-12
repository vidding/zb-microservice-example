var path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const Config = require('./config')

const PROTO_PATH = path.resolve(__dirname, './proto/echo.proto')

const pd = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
   })
const grpcService = grpc.loadPackageDefinition(pd).grpc.gateway.testing

const client = new grpcService.EchoService('localhost:' + Config.port, grpc.credentials.createInsecure())

module.exports = client