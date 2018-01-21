var mongoose = require('mongoose')
var Schema = mongoose.Schema

var locationModel = new Schema({
    image: {
        type: String,
        unique: false,
        required: true
    },
    destination: {
        type: String,
        unique: false,
        required: true
    },
    visitCount: {
        type: Number,
        unique: false,
        required: false
    }
})

module.exports = mongoose.model('Location', locationModel)
