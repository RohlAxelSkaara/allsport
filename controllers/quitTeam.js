const Team = require('../models/Team.js')
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const bcrypt = require('bcrypt')


module.exports = async (req, res) => {

    const teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    const user = await User.findById(req.session.userId).populate('membership').populate('leadership')
    const post = await Post.find({team: teams}).sort({'datePosted': -1})
    const userPost = await Post.find({members: user})


    let quitTeam = req.body.quitTeam


        await bcrypt.compare(await quitTeam, await user.password, async (error, same) => {
            if (await same) {
                await teams.members.pull(user);
                await teams.leaders.pull(user);
                await user.membership.pull(teams);
                await user.leadership.pull(teams);
                for (let i = 0; i < userPost.length; i++) {
                    await userPost[i].members.pull(user)
                    await userPost[i].save()
                }
                await teams.save()
                await user.save()
                await res.render('userTeams', {
                    teams,
                    user,
                    post
                });
            }
        })

}