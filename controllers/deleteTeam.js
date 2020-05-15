const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {

    //Finds the form with the id="deleteTeam" and sets it´s value to a variable named deletePost
    let deleteTeam = req.body.deleteTeam


    const user = await User.findById(req.session.userId)

    //compares the password written in the form with the users password
    await bcrypt.compare(deleteTeam, user.password, async (error, same) => {
        if (await same) {

            //Delete the Team from all Users membership and leadership
            const teamMembers = await User.find({membership: req.params.id})
            for (let i = 0; i < teamMembers.length; i++) {
                await teamMembers[i].membership.pull(req.params.id)
                await teamMembers[i].leadership.pull(req.params.id)
                await teamMembers[i].save()
            }

            //Delete all posts made by Team, delete posts and then delete the team
            await Post.deleteMany({team: req.params.id})
            await Team.findByIdAndDelete({_id: req.params.id}, () => {
                //Sends the user to the homepage
                res.redirect('/')
            })
        }
    })

}
