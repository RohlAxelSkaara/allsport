const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')
const Team = require('../models/Team.js')

module.exports = async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable').populate('team')
    const user= await User.findById(req.session.userId).populate('leadership')
    const teams = await Team.find({teamPost: post._id})

   if( await req.body.available == "available") {
        post.available.addToSet(user)
        post.notAvailable.pull(user)

    }
    if( await req.body.notAvailable  == "notAvailable"){
        post.available.pull(user)
        post.notAvailable.addToSet(user)
    }

    await post.save()



    console.log(teams)
    console.log(user)



    res.render('post',{
        post,
        user,
         teams
    });
}