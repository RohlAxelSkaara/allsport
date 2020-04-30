
const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')
const Team = require('../models/Team')

module.exports = async (req,res)=>{

    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable').populate('team').populate('members')
    const user= await User.findById(req.session.userId).populate('leadership')
     const teams = await Team.find({teamPost: post._id})


    console.log(teams)
    console.log(user)



    res.render('post',{
        post,
        user,
        teams
    });
}
