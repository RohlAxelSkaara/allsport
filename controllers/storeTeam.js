const Team = require('../models/Team.js')
const User = require('../models/User.js')
const path = require('path')
const Post = require('../models/Post')

module.exports = async (req,res)=> {
    //Creates the Team, the User who created the team is set as both a member and a leader
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

    //Creator is the user whom created the team
    const creator = await User.findById(req.session.userId)
    //Pushes the team into both the creators leadership array and membership array
    await creator.leadership.push(teamsCreate)
    await creator.membership.push(teamsCreate)

    await creator.save()
    await teamsCreate.save()

    const user = await User.findById(req.session.userId)
    const teams =  await Team.findById(teamsCreate._id).populate('members').populate('leaders')
    const post = await Post.find({team: teams}).sort({'datePosted': -1})

    res.render('team',{
        user,
        teams,
        post
    })
}