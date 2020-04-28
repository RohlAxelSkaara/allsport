

/*
const Team = require('../models/Team.js')

module.exports = async (req,res)=>{



        const teams = Team.find({teamName: 'Gutta IL' })
    console.log(teams)

    res.render('findTeam',{
        teams
    });
}
*/
const Team = require('../models/Team.js')
const User = require('../models/User.js')
module.exports = async (req, res) =>{
/*
     let sport = null
         if(req.body.sportType != null){
             sport = {
                 sportType: req.body.sportType
             }
         }

    let location = null
    if(req.body.location != null){
        location = {
            location: req.body.location
        }
    }

*/

    const query = req.body;
    const conditions = {};

    if (query.sportType) {
        conditions.sportType = query.sportType;
    }

    if (query.location) {
        conditions.location = query.location;
    }

        const teams = await Team.find(conditions, function () {})

    console.log(query)



   /*let sportFilter = null
    if(req.body.sportType != null){
        sportFilter = req.body.sportType
    }

    let locationFilter = null
    if(req.body.location != null){
        locationFilter = req.body.location
    }


   let filter = {
       sportType: sportFilter,
       location: locationFilter
   }

*/
    //const teams = await Team.find({...filter})

    const user = await User.findById(req.session.userId)
    res.render('findTeam', {
        teams,
        user
    })
}





