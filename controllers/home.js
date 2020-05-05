//This file renders the Users homepage/fees
const Post = require('../models/Post.js')

module.exports = async (req, res) =>{

    //Finds every post from Teams the User is a member of, and sorts them in descending order based on datePosted
    const post = await Post.find({members:req.session.userId}).sort({'datePosted': -1}).populate('team')

    res.render('index', {
        post,
    })
}

