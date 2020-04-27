const Team = require('../models/Team.js')
const User = require('../models/User.js')

module.exports = async (req,res)=>{
    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user= await User.findById(req.session.userId)

    console.log(req.params.id)
    res.render('team',{
        teams,
        user,

    });
}

