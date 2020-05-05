//This controller finds the team and renders it
const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')

module.exports = async (req,res)=>{
    //finds the team and populates the members
    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user= await User.findById(req.session.userId)
    const post = await Post.find({team: teams}).sort({'datePosted': -1})

    res.render('team',{
        teams,
        user,
        post

    });
}

