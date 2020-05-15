const User = require('../models/User.js')
const path = require('path')


module.exports = (req,res)=>{

    User.create(req.body, (error, user) => {
        if(error){
            console.log('Username exists')
            return res.redirect('/auth/register')
        }
        //When user is stored and sent back to homepage/ the new user._id is requested and logs inn automatically
        req.session.userId = user._id
        res.redirect('/')
    })
}

