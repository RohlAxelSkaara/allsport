const Team = require('../models/Team.js')
const path = require('path')

module.exports = (req,res)=>{
    Team.create({
        ... req.body,
        teamName: req.body.teamname ,
        sportType: req.body.sporttype,
        description: req.body.description,
        location: req.body.location
    })
    console.log("req.body",req.body)
    res.redirect('/')
}
