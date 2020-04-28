
const TeamPost = require('../models/TeamPost.js')
const Team = require('../models/Team')

module.exports = async (req, res) =>{

    const teamPost = await TeamPost.find({members:req.session.userId}).sort({'datePosted': -1}).populate('team')



    res.render('index', { //arr,
        teamPost,

    })
}

