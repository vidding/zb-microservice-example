/**
 * Created by 魏永戍 on 2017/6/14.
 */
var mongoose = require('../db');

var fs = require('fs');
var path = require('path');

var models_path = path.join(__dirname, 'mapping');
// console.log(models_path);
fs.readdirSync(models_path).forEach(function (file) {
    if (global.myrequire) {
        myrequire(models_path + '/' + file, "");
    } else {
        require(models_path + '/' + file);
    }
    var modelName = file.replace('Model.js', '');
    // skip Base
    if (modelName != 'Base') {
        exports[modelName] = mongoose.model(modelName);
    }
});