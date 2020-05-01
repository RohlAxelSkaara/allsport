const User = require('../models/User.js')
const Post = require('../models/TeamPost.js')
const Team = require('../models/Team')
const bcrypt = require('bcrypt')

module.exports = async (req,res)=>{



    let updateTitle = req.body.updateTitle;
    let updateDescription = req.body.updateDescription  ;
    let deletePost = req.body.deletePost;

    const conditions = {};

    if (updateTitle) {
        conditions.title = updateTitle
    }

    if (updateDescription) {
        conditions.description = updateDescription
    }




    const leaderDelete = await User.findById(req.session.userId)

    if (await deletePost) {
        await bcrypt.compare(deletePost, leaderDelete.password, async (error, same) => {
            if (await same) {

                //Delete the Post from the Teams.teampost
                const teams = await Team.findOne({teamPost: req.params.id})
                    console.log(teams.teamPost)
                console.log(req.params.id)
                    await teams.teamPost.pull(req.params.id)
                    await teams.save()


                //Delete Post and return to team
                const user= await User.findById(req.session.userId).populate('leadership').populate('membership')
                const teamPost = await Post.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('available').populate('notAvailable').populate('team').populate('members')
                await Post.findByIdAndDelete({_id: req.params.id},()=>{
                    res.redirect('/')
                })
            }
        })
    }








    const post = await Post.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('available').populate('notAvailable').populate('team').populate('members')
    const user= await User.findById(req.session.userId).populate('leadership')
    const teams = await Team.find({teamPost: post})

    console.log(user)


    if(updateTitle || updateDescription){
    res.render('post',{
        post,
        user,
        teams
    });
    }
}