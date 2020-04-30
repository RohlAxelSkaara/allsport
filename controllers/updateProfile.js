const User = require('../models/User.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {


    // Used when updating the Users Profile
    //-          -          -          -          -          -          -          -          -
    let updateUsername = req.body.newUsername;
    let updatePassword = req.body.newPassword;
    let deleteUser     = req.body.deleteUser
    const conditions = {};

    if (updateUsername) {
        conditions.username = updateUsername
        await User.findByIdAndUpdate(req.session.userId, conditions, function () {})
    }

    if (updatePassword) {
        await bcrypt.hash(updatePassword, 10, (error, hash) => {
            updatePassword = hash
            conditions.password = updatePassword
            User.findByIdAndUpdate(req.session.userId, conditions, function () {})
        })
    }
    //-          -          -          -          -          -

   /* if (deleteUser) {
                user.remove()
                global.loggedIn = null
                console.log(loggedIn)
                res.redirect('/')
            }*/

    const user = await User.findById(req.session.userId)

    res.render('userProfile',{
        user
    });

}