//const Team = require('../models/Team.js')

/*module.exports = async (req, res) =>{
    const teams = await Team.find({}).populate('_id');
    res.render('userTeams',{
        teams
    });
}*/


const User = require('../models/User.js')

module.exports = async (req, res) =>{
   const user = await User.findById(req.session.userId).populate('membership')

      res.render('userTeams',{
      user

      });

  }