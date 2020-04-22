const User = require('../models/User.js')
const path = require('path')

module.exports = (req,res)=>{

    User.create(req.body, (error, user) => {
        if(error){
            return res.redirect('/auth/register')
        }
        req.session.userId = user._id
        res.redirect('/')
    })
}
