const TeamPost = require('../models/TeamPost.js')
const mongoose = require('mongoose')
const Team = require('../models/Team.js')
const path = require('path')
const User = require('../models/User')



module.exports = async (req,res)=> {
        const user = await User.findById(req.session.userId)
        const teams = await Team.findById(req.params.id)
        const teamPost = await TeamPost.create({
        ...req.body,
        title: req.body.title,
        description: req.body.description,
         available: [],
         notAvailable: [],
         team: teams._id
    })


    for(let i = 0; i < teams.members.length; i++){
        await teamPost.members.push(teams.members[i])
        await teamPost.save()
    }

        await teams.teamPost.push(teamPost)
        await teams.save()
        await teamPost.save()
        const post = await TeamPost.findById(teamPost._id).populate('team')


        res.render('post',{
            post,
            teams,
            user,
        });
    }



