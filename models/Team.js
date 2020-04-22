const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    teamName: String,
    sportType: String,
    description: String,
    location: String
})

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team