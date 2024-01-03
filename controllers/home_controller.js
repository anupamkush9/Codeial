module.exports.home = function(req,res){
    res.render('home', {
        title : "Home"
    })
}

module.exports.about = function(req,res){
    res.render('home', {
        title : "About"
    })
}