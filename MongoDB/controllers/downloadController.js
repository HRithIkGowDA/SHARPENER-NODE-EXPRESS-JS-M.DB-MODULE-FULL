const Download = require('../models/download')


exports.downloadget = async (req,res,next)=>{
    try{
        console.log(req.user.id);
        const Users = await Download.findAll({where:{userId:req.user.id}});
        console.log(Users);
        res.status(200).json({allDetails:Users});
    }catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
    }