const Team = require('../models/Team.js')
const User = require('../models/User.js')

module.exports = async (req,res)=>{
    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')

    const user = await User.findById(req.session.userId).populate('membership').populate('leadership')


    await teams.members.push(user)

    await user.membership.push(teams)

    await user.save()

    await teams.save()

    await res.redirect('back')

}
