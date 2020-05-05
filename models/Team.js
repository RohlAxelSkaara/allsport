const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let uniqueValidator = require('mongoose-unique-validator')


const TeamSchema = new Schema({
    teamName: {
        type: String,
        unique: true
    },
    sportType  : String,
    description: String,
    location   : String,
    members    : [{ type: Schema.Types.ObjectId, ref: 'User'/*, unique: true*/ }],
    leaders    : [{type: Schema.Types.ObjectId, ref: 'User'}],
    post       : [{type: Schema.Types.ObjectId, ref: 'Post'}],
    level      : []
})

TeamSchema.plugin(uniqueValidator);
const Team = mongoose.model('Team', TeamSchema);
module.exports = Team
