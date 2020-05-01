const Team = require('../models/Team.js')
const User = require('../models/User.js')
const TeamPost = require('../models/TeamPost.js')
const bcrypt = require('bcrypt')

module.exports = async (req, res) => {


    let updateTeamName = req.body.updateTeamName;
    let updateSportType = req.body.updateSportType;
    let updateDescription = req.body.updateDescription;
    let updateLocation = req.body.updateLocation;
    let updateLevel = req.body.updateLevel;
    let quitTeam = req.body.quitTeam
    let deleteTeam = req.body.deleteTeam
    const conditions = {};

    if (updateTeamName) {
        conditions.teamName = updateTeamName

    }

    if (updateSportType) {
        conditions.sportType = updateSportType

    }

    if (updateDescription) {
        conditions.description = updateDescription

    }

    if (updateLocation) {
        conditions.location = updateLocation

    }

    if (updateLevel) {
        conditions.level = updateLevel

    }



    const leaderDelete = await User.findById(req.session.userId)

    if (await deleteTeam) {
        await bcrypt.compare(deleteTeam, leaderDelete.password, async (error, same) => {
            if (await same) {

                //Delete the Team for all Users membership and leadership
                const teamMembers = await User.find({membership: req.params.id})
                for(let i = 0; i < teamMembers.length; i++){
                    await teamMembers[i].membership.pull(req.params.id)
                    await teamMembers[i].leadership.pull(req.params.id)
                    await teamMembers[i].save()
                }

                //Delete all posts made by Team, delete posts and delete team
                await TeamPost.deleteMany({team: req.params.id })
                await Team.findByIdAndDelete({_id: req.params.id},()=>{
                    res.redirect('/')
            })
            }
        })
    }



    let teams = await Team.findByIdAndUpdate(req.params.id, conditions, function () {}).populate('members').populate('leaders')
    let user= await User.findById(req.session.userId).populate('membership')
    console.log(user)
    let teamPost = await TeamPost.find({team: teams}).sort({'datePosted': -1})
    const userPost = await TeamPost.find({members: user})


    let newLeader = await req.body.newLeader
    let userLeader = await User.findOne({username: newLeader})
    console.log(userLeader)
    if(await newLeader){
        await teams.leaders.push(userLeader)
        await userLeader.leadership.push(teams)
        await teams.save()
        await userLeader.save()

    }



    if(await quitTeam){
        await bcrypt.compare(quitTeam, user.password, async (error, same) => {
            if (await same) {
                await teams.members.pull(user);
                await teams.leaders.pull(user);
                await user.membership.pull(teams);
                await user.leadership.pull(teams);
                for(let i = 0; i < userPost.length; i++) {
                    await userPost[i].members.pull(user)
                    await userPost[i].save()
                }
                await teams.save()
                await user.save()

                res.render('userTeams', {
                    teams,
                    user,
                    teamPost
                });
            }
    })
  }

    teams = await Team.findById(req.params.id).populate('members').populate('leaders')
    user= await User.findById(req.session.userId)
    teamPost = await TeamPost.find({team: teams}).sort({'datePosted': -1})


   if(!deleteTeam || !quitTeam /*|| !newLeader*/) {
       res.render('team', {
           teams,
           user,
           teamPost
       });
   }

}