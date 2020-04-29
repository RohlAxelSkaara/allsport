const User = require('../models/User.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {


    let updateUsername = req.body.newUsername;
    let updatePassword = req.body.newPassword;
    const conditions = {};

    if (updateUsername) {
       conditions.username = updateUsername
       User.findByIdAndUpdate(req.session.userId, conditions, function () {})
    }

    if (updatePassword) {
        await bcrypt.hash(updatePassword, 10, (error, hash) => {
            updatePassword = hash
            conditions.password = updatePassword
            User.findByIdAndUpdate(req.session.userId, conditions, function () {})
        })
    }


    const user = await User.findById(req.session.userId)
    console.log(conditions)




    res.render('userProfile',{
        user
    });

}