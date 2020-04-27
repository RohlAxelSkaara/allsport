
const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')

module.exports = async (req,res)=>{
    const post = await Post.findById(req.params.id).populate('available').populate('notAvailable')
    const user= await User.findById(req.session.userId)



    res.render('post',{
        post,
        user
    });
}
