const mongoose = require("mongoose");
const TokenGenerator = require("uuid-token-generator");
const tokgen = new TokenGenerator(256, TokenGenerator.BASE58);
const UserModel = mongoose.model("user");
const AdminModel = mongoose.model("admin");
const university = require('../consts/universities');

const email_check = (email, callback)=>{

  UserModel.findOne({email}, (err, result)=>{

    if(result){

      callback(false);
    
    }else{

      callback(true);
    }
  });
}

const create_user = (req, res)=>{

  // req - > admin_code, verification_code, max_post

  AdminModel.findOne({admin_code:req.body.admin_code}, (err, admin)=>{

    if(err){

      res.send({error:err});

    }else if(admin){

      UserModel.create({

        token: '',
        email: '',
        password: '',
        full_name: '',
        //student_id: '',
        verification_code: req.body.verification_code,
        phone_number: '',
        telegram: '',
        instagram: '',
        university: university.tehran_fouman,
        post_n: 0,
        max_post: req.body.max_post || 5,
      },(err, result)=>{
    
          if(err){
            res.send({error:err})
            console.log(err)
          }else if(result){
            res.send({result:200})
          }else{
            res.send({error:'mistake in create_user!!!'})
            console.log('mistake in create_user!!!')
          }
      });
    }
  });

  // res -> error, result
}

const sign_up = (req, res) => {

  // req - > verification_code, email, password, full_name

  let verification_code = req.body.verification_code || 'empty';
  let email = req.body.email || 'empty';
  let password = req.body.password || 'empty';
  let full_name = req.body.full_name || 'empty';

  email_check(email, (isNew)=>{

    if(isNew){

      // generate a token
      const token = tokgen.generate();

      //find the user and update it
      UserModel.updateOne(
        //condition, query based on verification_code
        { verification_code},
        // update the user info
        {
          token,
          email,
          password,
          full_name,
          //student_id: req.body.student_id,
          verification_code:null
        },
        (err, rawuser) => {

          if (err) {
            console.error(err);
            res.status(500).send({ error: err });
          } else if (rawuser.nModified > 0) {

            UserModel.findOne({token}, (err, user)=>{

              if(err){
                
                console.error(err);
                res.status(500).send({ error: err });

              }else{

                console.log('user created :'+user);
                res.status(200).send({ user });
              }
            })

          } else {
            res.status(400).send({
              error: `cant find the user with ${
                req.body.verification_code
              } as verf_code`
            });
          }
        }
      );

    }else{

      res.send({error:'email has been registered'});
    }
  });

  // res -> user, error
}// ready for use

const sign_in = (req, res) => {
  
  // req -> email, password

  let email = req.body.email || 'empty';
  let password = req.body.password || 'empty';

  UserModel.findOne(
    
    {email, password},

    (err, result)=>{

      if (err) {
        
        console.error(err);
        res.status(500).send({ error: err });
      
      } else if (result) {
        
        res.send({user:result});
        console.log("sign_in success! -> "+result);
      
      }else{
        res.send({error:'notFound'})
      }
    });

    // res -> error, user 
}// ready for use

module.exports = {create_user, sign_in, sign_up}