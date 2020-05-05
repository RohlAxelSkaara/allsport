const Post = require('../models/Post.js')
const mongoose = require('mongoose')
const Team = require('../models/Team.js')
const path = require('path')
const User = require('../models/User')



module.exports = async (req,res)=> {

        const user= await User.findById(req.session.userId) //Creates new post
        const teams = await Team.findById(req.params.id)
        const post = await Post.create({
        ...req.body,
        title: req.body.title,
        description: req.body.description,
         available: [],
         notAvailable: [],
         team: teams._id
    })

    //Pushes all the registered members of a team, into the members array of the post
    for(let i = 0; i < teams.members.length; i++){
        await post.members.push(teams.members[i])
        await post.save()
    }
        //Pushes the post into the Team post array and saves the Team and Post
        await teams.post.push(post)
        await teams .save()
        await post.save()



        res.render('post',{
            post,
            teams,
            user
        });
    }



