const User = require('../models/User.js')
const path = require('path')


module.exports = (req,res)=>{

    User.create(req.body, (error, user) => {
        if(error){
            return res.redirect('/auth/register')
        }
        req.session.userId = user._id //When user i stored and sent back to homepage/ the new userid is requested and auto logs inn
        res.redirect('/')
    })
}

/*
module.exports = (req,res)=>{
    User.create({
        ...req.body,
        username: req.body.username,
        password: req.body.password,
        teams: []
    })
    //req.session.userId = user._id //When user i stored and sent back to homepage/ the new userid is requested and auto logs inn
    res.redirect('/')
}*/