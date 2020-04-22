module.exports =  (req, res) =>{
    res.render('index', {
        userid: req.session.userId
    })
}