require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Forgotpassword = require('../models/forgotpassword');


exports.forgotpassword = async (req,res)=>{
    try {
       
        console.log(req.user);
        const  email  = req.body.email;
        let id = req.user._id
        const user = await User.find( { username:email });
        if(user){
          let f = new  Forgotpassword({
            active:true,
            userId:req.user._id
          })
           
            const msg = {
                to: email, // Change to your recipient
                from: 'hrithikgowda060@gmail.com', // Change to your verified sender
                subject: 'Sending with SendGrid is Fun',
                text: 'and easy to do anywhere, even with Node.js',
                html: `<a href="http://localhost:3000/password/resetpassword/${f._id}">Click to set your password</a>`,
            }
                console.log(msg.html)
                f.save()
                return res.status(200).json({message: 'Link to reset password sent to your mail ', sucess: true,link :msg})
                
            

            //send mail
        }else {
            throw new Error('User doesnt exist')
        }
    } catch(err){
        console.error(err)
        return res.json({ message: err, sucess: false });
    }

}
exports.resetpassword = async (req, res) => {
    const id =  req.params.id;
    console.log(id)
   let forgotpasswordrequest = await Forgotpassword.findById(id)   
          
       if (forgotpasswordrequest) {
            forgotpasswordrequest.active= false 
         
            res.status(200).send(`<html>
                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password"></input>
                                        <button>Reset Password</button>
                                    </form>
                                </html>`
            );
           forgotpasswordrequest.save()
            res.end();
    
        }

}

exports.updatepassword = async(req, res) => {

    try {
console.log(req.query.newpassward);
        const  newpassword  = req.query.newpassword;
        
        const { resetpasswordid } = req.params;
       
        Forgotpassword.findById( resetpasswordid).then(resetpasswordrequest => {
        const user = User.findById(resetpasswordrequest.userId).then(user => {
                if(user) {
                    const saltRounds = 10;

                        bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                           
                            user.password=hash;
                            console.log(user)
                        user.save().then(async () => {
                            

                             return   res.redirect('/login.html')
                                
                                   
                               
                                  
                                  
                            })
                        });
                    }
               
             else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}