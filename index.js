
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

//Middelware
const redirectIfAuthenticatedMiddleWare = require('./middleware/redirectIfAuthenticatedMiddleWare')

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
app.get('/auth/logout', logoutController)