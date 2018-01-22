var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tagsModel = new Schema({
    tags: {
        type: [String],
        unique: false,
        required: true
    }
})

module.exports = mongoose.model('Tags', tagsModel)
