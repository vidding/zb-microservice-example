var mongoose = require('../../db');
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
    id: String,
    title: String,
    content: String
});

mongoose.model('Notes', NotesSchema);