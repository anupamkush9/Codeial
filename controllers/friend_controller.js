const User = require('../models/user');
const Friend = require('../models/friendship');


module.exports.toggleFriend = async function(req,res){
    try{
        // friends/toggle/?id=abcd
        let deleted = false;

        let me = await User.findById(req.user._id).populate('friendship');

        // check if a friend already exists
        let existingFriend = await Friend.findOne({
            from_user : req.user._id,
            to_user : req.query.id
        });

        console.log(existingFriend);

        if(existingFriend){
            console.log("Matched");
            
            me.friendship.pull(existingFriend._id);
            me.save();

            await Friend.deleteOne({
                from_user : req.user._id,
                to_user : req.query.id
            });

            deleted = true;
        }else{
            console.log("not matched");
            let newFriend = await Friend.create({
                from_user : req.user._id,
                to_user : req.query.id
            });

            me.friendship.push(newFriend);
            me.save();
        }

        return res.status(200).json({
            message : "Resquest successful !",
            data : {
                deleted : deleted
            }
        })

    }catch(err){
        console.log("Error in making friend :" + err);
        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}

module.exports.friendList = async function(req,res){
    
    if(req.user){
    await User.findById(req.user._id)
    .populate({
        path : 'friendship',
        populate : [
            { path : 'to_user'},
            { path : 'from_user'}
        ]
    }).then((data)=>{
        User.find({}).then((users)=>{
            return res.status(200).json({
                user : data,
                all_users : users
            })
        })
    }).catch((err)=>{
        user.find()
        return res.status(500).json({
            message : "Internal Server Error"
        })
    })
}else{
    
    return res.status(500).json({
        message : "internal server error"
    })
}

}

module.exports.checkFriend = async function(req,res){
    try{
        // friends/toggle/?id=abcd
        let deleted = false;

        let me = await User.findById(req.user._id).populate('friendship');

        // check if a friend already exists
        let existingFriend = await Friend.findOne({
            from_user : req.user._id,
            to_user : req.query.id
        });

        console.log(existingFriend);

        if(existingFriend){
            console.log("Matched");

            deleted = true;
        }

        return res.status(200).json({
            message : "Resquest successful !",
            data : {
                deleted : deleted
            }
        })

    }catch(err){
        console.log("Error in making friend :" + err);
        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}
