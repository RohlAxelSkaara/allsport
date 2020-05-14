const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require ('../models/Post')

module.exports = async (req,res)=>{
    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user = await User.findById(req.session.userId)
    const post = await Post.find({team: teams}).sort({'datePosted': -1})



    //When the User joins the Team, the user is pushed into the members array of every post created by the team.
    for(let i = 0; i < post.length; i++){
    await post[i].members.push(user)
    await post[i].save()
    }

    //Pushes the user into the members array of the team
    await teams.members.push(user)
    //Pushes the team into the membership array of the user
    await user.membership.push(teams)

    await user.save()

    await teams.save()

     res.render('team',{
            teams,
            user,
            post

        });


}
