//This file enables the User to search for teams, based on one, multiple or all conditions
const Team = require('../models/Team.js')
const User = require('../models/User.js')
module.exports = async (req, res) =>{

    //query requests all id´s from the form
    const query = req.body;
    const conditions = {};

    //If anything is typed into the Team Name textfield, that teamName will be used as the var conditions
    // example: conditions = {teamName: "CBS Football"}
    if (query.teamName) {
        conditions.teamName = query.teamName;
    }

    if (query.sportType) {
        conditions.sportType = query.sportType;
    }

    if (query.location) {
        conditions.location = query.location;
    }

    if (query.level) {
        conditions.level = query.level;
    }

    //if search is based on multiple conditions, the conditions variable will may look like
    // example: conditions = {teamName: "CBS Football", location: "Fredriksberg"}

    const teams = await Team.find(conditions, function () {})
    const user = await User.findById(req.session.userId)
    res.render('findTeam', {
        teams,
        user
    })
}





