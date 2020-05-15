const express = require('express')

const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


//Controller
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
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const availableController = require('./controllers/available')
const profileController = require('./controllers/profile')
const updateProfileController = require('./controllers/updateProfile')
const updateTeamController = require('./controllers/updateTeam')
const updatePostController = require('./controllers/updatePost')
const teamUpdateController = require('./controllers/teamUpdate')
const makeLeaderController = require('./controllers/makeLeader')
const deleteTeamController = require('./controllers/deleteTeam')
const quitTeamController  = require('./controllers/quitTeam')
const deletePostController = require('./controllers/deletePost')

//Middelware
const redirectIfAuthenticatedMiddleWare = require('./middleware/redirectIfAuthenticatedMiddleWare')
const authMiddleware = require('./middleware/authMiddleware')




app.use(expressSession({
    secret: 'Unicornland'
}));


app.use(fileUpload())

mongoose.connect('mongodb+srv://Allsport:Semester.2@cluster0-qa74e.mongodb.net/test?retryWrites=true&w=majority\n', {useNewUrlParser: true});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')


//When the user logges in succsessfully, the users id is set as session.userId
global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});





app.listen(3000, ()=>{
    console.log('App listening on port 3000 ...')
})


//API
app.get('/',homeController)
app.get('/auth/register', redirectIfAuthenticatedMiddleWare, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleWare,  storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleWare,  logincontroller)
app.post('/users/login', redirectIfAuthenticatedMiddleWare, loginUserController)
app.post('/auth/logout',authMiddleware, logoutController)
app.get('/auth/create', authMiddleware,createTeamController)
app.post('/teams/create',authMiddleware, storeTeamController)
app.get('/auth/userTeams', authMiddleware, userTeamsController)
app.get('/teams/:id' ,authMiddleware, getTeamController)
app.post('/teams/:id',authMiddleware, updateMembershipController)
app.get('/findTeam',authMiddleware, findTeamController)
app.post('/findTeam',authMiddleware, findTeamController)
app.post('/teams/newPost/:id',authMiddleware, newPostController)
app.get('/teams/post/:id', getPostController)
app.post('/teams/post/:id/available',authMiddleware, availableController)
app.get('/profile/',authMiddleware, profileController)
app.post('/profile/update',authMiddleware, updateProfileController)
app.post('/teams/:id/update',authMiddleware, updateTeamController)
app.get('/teams/:id/update',authMiddleware, teamUpdateController)
app.post('/teams/post/:id/update',authMiddleware, updatePostController)
app.post('/teams/:id/newLeader',authMiddleware, makeLeaderController)
app.post('/teams/:id/delete', authMiddleware, deleteTeamController)
app.post('/teams/:id/quit', authMiddleware, quitTeamController)
app.post('/teams/post/:id/delete', deletePostController)