const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')
const Team = require('../models/Team')

module.exports = async (req,res)=>{



    let updateTitle = req.body.updateTitle;
    let updateDescription = req.body.updateDescription  ;

    const conditions = {};

    if (updateTitle) {
        conditions.title = updateTitle
    }

    if (updateDescription) {
        conditions.description = updateDescription
    }


    const post = await Post.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('available').populate('notAvailable').populate('team').populate('members')
    const user= await User.findById(req.session.userId).populate('leadership')
    const teams = await Team.find({teamPost: post})

    console.log(user)

    res.render('post',{
        post,
        user,
        teams
    });
}