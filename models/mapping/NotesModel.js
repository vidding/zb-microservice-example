/**
 * Created by suye on 2015/11/5.
 * 账号ID 用户ID 应用ID 必须用无符号32位随机整数
 * 默认创建 两个账号
 * username=cat, password=cat, role=master 开发者账号
 * username=catadmin, password=catadmin, role=admin
 */
// var fPublic = require('../../main/public');

var mongoose = require('../../db');
var Schema = mongoose.Schema;

//本地盒子中注册的账号，和集群从盒子中注册过来的账号
var NotesSchema = new Schema({
    id: String,
    title: String,
    content: String
});

mongoose.model('Notes', NotesSchema);