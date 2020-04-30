const User = require('../models/User.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {


    const userDelete = await User.findById(req.session.userId)

    let updateUsername =  await req.body.newUsername;
    let updatePassword = await req.body.newPassword;
    let deleteUser = await req.body.deleteUser;
    const conditions = {};

    if (updateUsername) {
        conditions.username = updateUsername
        await User.findByIdAndUpdate(req.session.userId, conditions, function () {
        })
    }

    if (await updatePassword) {
        await bcrypt.hash(updatePassword, 10, (error, hash) => {
            updatePassword = hash
            conditions.password = updatePassword
            User.findByIdAndUpdate(req.session.userId, conditions, function () {
            })
        })
    }


     if (await deleteUser) {
         await bcrypt.compare(deleteUser, userDelete.password, async (error, same) => {
            if (await same) {
                await User.findByIdAndDelete({_id: userDelete._id})
                await req.session.destroy(()=>{
                   res.redirect('/')
                })

            }
        })
    }




    const user = await User.findById(req.session.userId);


    if(updatePassword || updateUsername) {
        await res.render('userProfile', {
            user
        });
    }
}