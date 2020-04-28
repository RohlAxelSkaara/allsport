const Team = require('../models/Team.js')


module.exports = async (req,res)=>{
    const teams = await Team.find({sportType: req.body.sportType})
    console.log(teams)
    res.render('findTeam',{
       teams
    });
}