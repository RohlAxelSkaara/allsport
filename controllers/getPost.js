//This file fetches the Post and renders it for the user
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const Team = require('../models/Team')

module.exports = async (req,res)=>{

    //Finds the post and populates the with the usernames of the available/notAvailable, and the teamname
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable').populate('team')
    const user= await User.findById(req.session.userId)
    const teams = await Team.findOne({post: post._id})


    res.render('post',{
        post,
        user,
        teams
    });
}
