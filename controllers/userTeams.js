
const User = require('../models/User.js')

module.exports = async (req, res) =>{
   const user = await User.findById(req.session.userId).populate('membership')

      res.render('userTeams',{
      user

      });

  }