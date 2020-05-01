
const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')



const homeController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const logincontroller = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session')
const logoutController = require('./controllers/logout')
const createTeamController = require('./controllers/newTeam')
const storeTeamController = require('./controllers/storeTeam')
const userTeamsController = require('./controllers/userTeams')
const getTeamController = require('./controllers/getTeam')
const updateMembershipController = require('./controllers/updateMembership')
const findTeamController = require('./controllers/findTeam')
const teamSearchController = require('./controllers/teamSearch')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const availableController = require('./controllers/available')
const profileController = require('./controllers/profile')
const updateProfileController = require('./controllers/updateProfile')
const updateTeamController = require('./controllers/updateTeam')
const updatePostController = require('./controllers/updatePost')
const teamUpdateController = require('./controllers/teamUpdate')


//Middelware
const redirectIfAuthenticatedMiddleWare = require('./middleware/redirectIfAuthenticatedMiddleWare')
const authMiddleware = require('./middleware/authMiddleware')

app.use(expressSession({
    secret: 'Unicornland'
}));


app.use(fileUpload())

mongoose.connect('mongodb://localhost/allsport', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});






app.listen(4000, ()=>{
    console.log('App listening on port 4000 ...')
})

app.get('/',homeController)
app.get('/auth/register', redirectIfAuthenticatedMiddleWare, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleWare,  storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleWare,  logincontroller)
app.post('/users/login', redirectIfAuthenticatedMiddleWare, loginUserController)
app.get('/auth/logout',authMiddleware, logoutController)
app.get('/auth/create', authMiddleware,createTeamController)
app.post('/teams/create',authMiddleware, storeTeamController)
app.get('/auth/userTeams', authMiddleware, userTeamsController)
app.get('/teams/:id', authMiddleware, getTeamController)
app.post('/teams/:id',authMiddleware, updateMembershipController)
app.get('/findTeam', findTeamController)
app.post('/findTeam', findTeamController)
app.post('/teams/newPost/:id', newPostController)
app.get('/teams/post/:id', getPostController)
app.post('/teams/post/:id/available', availableController)
app.get('/profile/', profileController)
app.post('/profile/update', updateProfileController)
app.post('/teams/:id/update', updateTeamController)
app.get('/teams/:id/update', teamUpdateController)
app.post('/teams/post/:id/update', updatePostController)