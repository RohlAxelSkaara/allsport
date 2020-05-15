
//This file enables the user to press available or not available on the Post.
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const Team = require('../models/Team.js')

module.exports = async (req,res)=>{
    //Finds post
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable').populate('team')
    const user= await User.findById(req.session.userId)
    const teams = await Team.findOne({post: post._id})


    // If the button pressed with the id of "available"
    // the user._id will be pushed into the Post available arr, and be pulled out of notAvailable arr
    if( await req.body.available == "available") {
        post.available.addToSet(user)
        post.notAvailable.pull(user)
    }

    // If the button pressed with the id of "notAvailable"
    // the user._id will be pushed into the Post notAvailable arr, and be pulled out of available arr

    if( await req.body.notAvailable  == "notAvailable"){
        post.available.pull(user)
        post.notAvailable.addToSet(user)
    }

    //The post is saved with the updated available/notAvailable arrays
    await post.save()


    // Re-renders the post, with updated available/notAvailable
    res.render('post',{
        post,
        user,
        teams
    });
}