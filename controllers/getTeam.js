const Team = require('../models/Team.js')

module.exports = async (req,res)=>{
    const teams = await Team.findById(req.params.id).populate('_id');
    res.render('team',{
        teams
    });
}