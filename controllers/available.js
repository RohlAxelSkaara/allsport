const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')

module.exports = async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable').populate('team')
    const user= await User.findById(req.session.userId)

   if( await req.body.available == "available") {
        post.available.addToSet(user)
        post.notAvailable.pull(user)

    }
    if( await req.body.notAvailable  == "notAvailable"){
        post.available.pull(user)
        post.notAvailable.addToSet(user)
    }

    await post.save()


     res.render('post',{
        post,
        user
    });
}