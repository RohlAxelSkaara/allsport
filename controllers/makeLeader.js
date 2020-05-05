const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')


module.exports = async (req, res) => {


    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user= await User.findById(req.session.userId)
    const post = await Post.find({team: teams}).sort({'datePosted': -1})

    //Finds on user with the username given in the "Make leader" texfield, and pushes that user into the Team.leaders array
    let newLeader = await req.body.newLeader
    let userLeader = await User.findOne({username: newLeader})

    if(await newLeader){
        await teams.leaders.push(userLeader)
        await userLeader.leadership.push(teams)
        await teams.save()
        await userLeader.save()

    }


    res.render('team', {
        teams,
        user,
        post
    });
}
