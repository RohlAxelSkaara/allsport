const Team = require('../models/Team.js')
const User = require('../models/User.js')
module.exports = async (req, res) =>{
    const teams = await Team.find({}).populate('members')
    const user = await User.findById(req.session.userId)
    res.render('findTeam', {
        teams,
        user
    })
}