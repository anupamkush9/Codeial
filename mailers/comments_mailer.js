const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    console.log(comment);

    let htmlString = nodeMailer.renderTemplate({comment:comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from : 'anujkushwaha664@gmail.com',
        to : comment.user.email,
        subject : "New comment Published",
        html : htmlString,
    }, (err, info)=>{
        if(err){
            console.log("error in sending mail", err);
            return;
        }

        console.log("message sent", info);
    })
}