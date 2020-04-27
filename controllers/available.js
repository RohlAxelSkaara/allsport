const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')

module.exports = async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable')
    const user= await User.findById(req.session.userId)

   if( await req.body.available == "1") {
        post.available.addToSet(user)
        post.notAvailable.pull(user)

    }
    if( await req.body.notAvailable  == "2"){
        post.available.pull(user)
        post.notAvailable.addToSet(user)
    }

    await post.save()


     res.render('post',{
        post,
        user
    });
}