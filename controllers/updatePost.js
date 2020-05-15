const User = require('../models/User.js')
const Post = require('../models/Post.js')
const Team = require('../models/Team')


module.exports = async (req,res)=>{

    let updateTitle = req.body.updateTitle;
    let updateDescription = req.body.updateDescription;
    const conditions = {};

    //Makes the update as an conditon, example: conditon({title: "The new title"})
    if (updateTitle) {
        conditions.title = updateTitle
    }

    if (updateDescription) {
        conditions.description = updateDescription
    }


    //If multiple conditions are selected example: conditon({title: "The new title", description: "The new description"})

    const post  = await Post.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('available').populate('notAvailable').populate('team').populate('members')
    const user  = await User.findById(req.session.userId)
    const teams = await Team.findOne({post: post}).populate('members').populate('leaders')



    res.redirect('back');
}