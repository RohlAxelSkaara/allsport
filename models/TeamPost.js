const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator')

const TeamPostSchema = new Schema({
    title: String,
    description: String,

    datePosted:{
        type: Date,
        default: new Date()
    },
    available: [{type: Schema.Types.ObjectId, ref: 'User', _id: false}],
    notAvailable: [{type: Schema.Types.ObjectId, ref: 'User', _id: false}],
    members: [{type: Schema.Types.ObjectId, ref: 'User'}]
});



const TeamPost = mongoose.model('TeamPost', TeamPostSchema);
module.exports = TeamPost
