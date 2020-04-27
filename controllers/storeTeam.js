const Team = require('../models/Team.js')
const User = require('../models/User.js')
const path = require('path')

module.exports = async (req,res)=> {
    const user = await User.findById(req.session.userId);
    const teamsCreate = await Team.create({
        ...req.body,
        teamName: req.body.teamname,
        sportType: req.body.sporttype,
        description: req.body.description,
        location: req.body.location,
        members: [req.session.userId],
        leaders: [req.session.userId]
    });

    const teams = Team.findById(teamsCreate._id)

   console.log(teams)

    await user.leadership.push(teamsCreate)
    await user.membership.push(teamsCreate)
    await user.save()

    res.render('userTeams',{user}) // In future version it vil be directed to getTeam, since I cant polulat now get team dont work
}