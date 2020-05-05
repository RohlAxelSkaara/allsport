const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator')

const PostSchema = new Schema({
    title: String,
    description: String,

    datePosted:{
        type: Date,
        default:  Date.now
    },
    available: [{type: Schema.Types.ObjectId, ref: 'User', _id: false}],
    notAvailable: [{type: Schema.Types.ObjectId, ref: 'User', _id: false}],
    members: [{type: Schema.Types.ObjectId, ref: 'User' , _id: false}],
    team: {type: Schema.Types.ObjectId, ref: 'Team'}
});



const Post = mongoose.model('Post', PostSchema);
module.exports = Post
