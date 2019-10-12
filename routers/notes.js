const Log = require('../log')
const Models = require('../models')
const Cache = require('../libs/cache')

async function listNotes(ctx) {
    var ret = await Models.Notes.find({})
    Log.debug('listNotes', ret.length)
    var notes = ret.map(o => {
        return {
            id: o.id,
            title: o.title,
            content: o.content
        }
    })
    ctx.res = { notes }
}

async function getNote(ctx) {
    ctx.res = await Models.Notes.findOne({id: ctx.req.id})
}

async function insertNote(ctx) {
    if (!ctx.req.title || !ctx.req.content) {
        ctx.res = {
            id: 0,
            title: '',
            content: ''
        }
        return
    }
    var note = new Models.Notes({
        id: 10000 + Math.floor(Math.random() * 1000),
        title: ctx.req.title,
        content: ctx.req.content
    })
    var  ret = await note.save();
    Log.debug('insertNote', ret)
    ctx.res = ret
}

async function updateNote(ctx) {

    var ret = await Models.Notes.update({id: ctx.req.id}, {title: ctx.req.title, content: ctx.req.content})
    Log.debug('updateNote', ret)
    ctx.res = {
        id: ctx.req.id,
        title: ctx.req.title,
        content: ctx.req.content
    }
}

async function deleteNote(ctx) {
    var ret = await Models.Notes.remove({id: ctx.req.id})
    Log.debug('deleteNote', ret)
    ctx.res = {}
}

module.exports = {
    list: listNotes,
    get: getNote,
    insert: insertNote,
    update: updateNote,
    delete: deleteNote
}