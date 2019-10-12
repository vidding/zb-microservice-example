// http://www.mongoosejs.net/

const mongoose = require('mongoose')
const Config = require('../config')
const Log = require('../log')

mongoose.connect(Config.mongodb,  {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error',  function(err) {
    Log.error('mongoose error', err)
});
db.once('open', function() {
  // we're connected!
  Log.info('mongoose open', Config.mongodb)

});

module.exports = mongoose