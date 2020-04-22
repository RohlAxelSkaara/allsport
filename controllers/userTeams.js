const Team = require('../models/Team.js')

module.exports = async (req, res) =>{
    const teams = await Team.find({}).populate('_id');
    res.render('userTeams',{
        teams
    });
}