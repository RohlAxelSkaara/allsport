const bcrypt = require('bcrypt')
const User = require('../models/User.js')

module.exports = (req, res) =>{
    const { username, password } = req.body;

    //Finds the one user with the username given in the textfield
    User.findOne({username:username}, (error,user) => {

      if (user){
        //Compares the given password with the one registered on the user, rehashed.
        bcrypt.compare(password, user.password, (error, same) =>{
          if(same){
          req.session.userId = user._id
            res.redirect('/')
          }
          else{
            res.redirect('/auth/login')
          }

        })
      }
      else{
        res.redirect('/auth/login')
      }
    })
}
