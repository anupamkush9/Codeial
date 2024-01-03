module.exports.userGet = function(req,res){
    res.send("<h1>user profile page of Codial</h1>");
}

module.exports.signUp = function(req,res){
    res.render('sign_up',{ title : "signUp"})
}

module.exports.signIn = function(req,res){
    res.render('sign_in', {title : "signIn"})
}

module.exports.userCreate = function(req,res){
    //  todo later
    res.send("you are now signup");
}

module.exports.createSession = function(req,res){
    // todo later
} 