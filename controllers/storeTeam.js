const Team = require('../models/Team.js')
const User = require('../models/User.js')
const path = require('path')
const TeamPost = require('../models/TeamPost')

module.exports = async (req,res)=> {
    const teamsCreate = await Team.create({
        ...req.body,
        teamName: req.body.teamname,
        sportType: req.body.sporttype,
        description: req.body.description,
        location: req.body.location,
        members: [req.session.userId],
        leaders: [req.session.userId],
        level : [req.body.level]
    });


    const creator = await User.findById(req.session.userId)
    await creator.leadership.push(teamsCreate)
    await creator.membership.push(teamsCreate)
    await creator.save()
    await teamsCreate.save()
    const user = await User.findById(req.session.userId)
    const teams =  await Team.findById(teamsCreate._id).populate('members').populate('leaders')
    const teamPost = await TeamPost.find({team: teams}).sort({'datePosted': -1})
    res.render('team',{
        user,
        teams,
        teamPost
    })
}