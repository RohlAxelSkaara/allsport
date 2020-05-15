const User = require('../models/User.js')
const Post = require('../models/Post.js')
const Team = require('../models/Team')
const bcrypt = require('bcryptjs')



module.exports = async (req, res) => {


    let post = await Post.findById(req.params.id).sort({'datePosted': -1})
    const user = await User.findById(req.session.userId)
    const teams = await Team.findOne({post: post}).populate('members').populate('leaders')

    //Finds the form with the id="deletePost" and sets it´s value to a variable named deletePost
    let deletePost = req.body.deletePost;

    //If a password is written into the form
    if (await deletePost) {
        //compares the password written in the form with the users password
        await bcrypt.compare(deletePost, user.password, async (error, same) => {
            if (await same) {

                //If passwords are the same, delete the Post.id from the Teams.post

                await teams.post.pull(post)
                await teams.save()



                //Then delete the Post and return to the teampage
                await Post.findByIdAndDelete({_id: req.params.id}, async() => {
                    //reassign the post variable to all the posts from the team
                    post = await   Post.find({team: teams}).sort({'datePosted': -1})
                    res.render('team', {
                        user,
                        teams,
                        post
                    })
                })
            }else if(error){
                console.log('Wrong password')
                res.redirect('back')
            }
        })
    }
}