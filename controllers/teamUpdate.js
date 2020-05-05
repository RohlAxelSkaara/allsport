//Sends the user to update team page
const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')

module.exports = async (req, res) =>{

    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user= await User.findById(req.session.userId)
    const post = await Post.find({team: teams}).sort({'datePosted': -1})

    res.render('updateTeam',{
        teams,
        user,
        post
    })

}