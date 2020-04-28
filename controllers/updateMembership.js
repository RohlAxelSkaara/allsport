const Team = require('../models/Team.js')
const User = require('../models/User.js')
const TeamPost = require ('../models/TeamPost.js')

module.exports = async (req,res)=>{
    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user = await User.findById(req.session.userId).populate('membership').populate('leadership')
    const teamPost = await TeamPost.find({team: teams})


    //The to push the user._id into the teampost.member array
    for(let i = 0; i < teamPost.length; i++){
    await teamPost[i].members.push(user)
    await teamPost[i].save()
    }

    await teams.members.push(user)

    await user.membership.push(teams)

    await user.save()

    await teams.save()

    await res.redirect('back')

}
