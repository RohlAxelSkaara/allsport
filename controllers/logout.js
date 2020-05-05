module.exports = (req, res) =>{
    //Destroys the session._id, and sends user to the login/register page
    req.session.destroy(()=>{
        res.redirect('/')
    })
}