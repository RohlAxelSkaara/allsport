const TeamPost = require('../models/TeamPost.js')
const mongoose = require('mongoose')
const Team = require('../models/Team.js')
const path = require('path')
const User = require('../models/User')



module.exports = async (req,res)=> {

        const teamsUpdate = await Team.findById(req.params.id)
        const teamPost = await TeamPost.create({
        ...req.body,
        title: req.body.title,
        description: req.body.description,
         available: [],
         notAvailable: [],
         team: teamsUpdate._id
    })


    for(let i = 0; i < teamsUpdate.members.length; i++){
        await teamPost.members.push(teamsUpdate.members[i])
        await teamPost.save()
    }

        await teamsUpdate .teamPost.push(teamPost)
        await teamsUpdate .save()
        await teamPost.save()

        const post = await TeamPost.findById(teamPost._id).populate('team').populate('available').populate('notAvailable')
        const user= await User.findById(req.session.userId).populate('leadership')
        const teams = await Team.findById(req.params.id)

        res.render('post',{
            post,
            teams,
            user
        });
    }



