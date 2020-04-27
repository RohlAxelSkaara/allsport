
const TeamPost = require('../models/TeamPost.js')

module.exports = async (req, res) =>{

    const teamPost = await TeamPost.find({members:req.session.userId}).sort({'datePosted': -1})
    //console.log(arr)


    res.render('index', { //arr,
        teamPost})
}

