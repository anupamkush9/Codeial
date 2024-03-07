const development = {
    name : 'development',
    assets_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'codeial',
    smtp : {
        service : 'gmail',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'anujmain1.0@gmail.com',
            pass : 'xtra kamg bkpn tvur',
        }
    },
    google_client_ID : "856394215775-5bfbp7bp3ls9elrk1siknqelvb6c7lt9.apps.googleusercontent.com",
    google_client_Secret : "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",
    google_call_back_URL : "http://localhost:8000/user/auth/google/callback",
    jwt_secret_key : 'Codeial'
   
}

const production = {
    name : 'production'
}

module.exports = development;