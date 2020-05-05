const User = require('../models/User.js')
const Team = require('../models/Team')
const Post = require('../models/Post')
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

                //Delete the User from all Users Team.members
                const teams = await Team.find({members: userDelete._id})
                for(let i = 0; i < teams.length; i++){
                    await teams[i].members.pull(userDelete._id)
                    await teams[i].leaders.pull(userDelete._id)
                    await teams[i].save()
                }

                //Delete the User from all Users Post.members, available and notAvailable
                const post = await Post.find({members: userDelete._id})
                for(let i = 0; i < post.length; i++){
                    await post[i].members.pull(userDelete._id)
                    await post[i].available.pull(userDelete._id)
                    await post[i].notAvailable.pull(userDelete._id)
                    await post[i].save()
                }

                //Delete the user and return to homepage
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