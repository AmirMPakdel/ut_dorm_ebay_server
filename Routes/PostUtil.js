const Post = require('../models/Post');
const User = require('../models/User');
const PostValidation = require('../validation/PostValidation');
const QueryValidation = require('../validation/QueryValidation');
const universities = require('../consts/universities');


const createPost = (req, res)=>{

    //req -> token, university, category, title, info, price, pic_n, com_type, com_id
    
    console.log()
    // check if user is registerd
    User.findByToken(req.body.token, (err, user)=>{

        if(err){
                
            console.log('createPost() -> '+err);
            res.send({error:'db error'});

        }else if(user){

            console.log(user);

            let ValidationErrors = PostValidation(req.body , user);

            if(ValidationErrors.length == 0){

                //let access_type = chooseAccessType(user);

                //let images = ArrangeImages(req.body.images);

                let post = new Post({
                    
                    university:universities.tehran_fouman,
                    seller: user._id,
                    category: req.body.category,
                    title: req.body.title,
                    info: req.body.info,
                    price: req.body.price,
                    pic_n:req.body.pic_n,
                    com_type:req.body.com_type,
                    com_id:req.body.come_id,
                    valid:false,
                });

                post.save((err)=>{

                    if(err){
                    
                        console.log(err);
                        res.send({error:err})
                    
                    }else{
                    
                        console.log(post);

                        // increament the user.post_n
                        User.updateOne({_id:user._id}, {post_n:user.post_n+1}, (err, raw)=>{

                            if(raw.nModified > 0){

                                res.send({_id:post._id, date:post.date});
                            }else{
                                console.log("error on increasing the user.post_n");
                                res.send({error:"error on increasing the user.post_n"});
                            }
                        });
                    }
                });

            }else{
                console.log('post not valid ->'+JSON.stringify(ValidationErrors));
                res.send({error: 'post not valid ->'+ValidationErrors})
            }

        }else{
            console.log('createPost() -> user with such token not found!'+req.body.token)
            res.send({error:'how the fuck u are creating post before registration!'})
        }
    });

    //res -> _id, date, error
}// ready for test

const getPosts = (req, res)=>{

    // req -> start, end, query

    let query = {};

    if(req.body.query != undefined){
        query = req.body.query
    }

    let start = 0;
    if(req.body.start != undefined){
        start = parseInt(req.body.start)
    }

    let end = 9999;
    if(req.body.end != undefined){
        end = parseInt(req.body.end)
    }

    query = QueryValidation(query);
    
    Post.find(query).skip(start).limit(end-start).sort("-date").then(
        
        (result)=>{

            res.send({list:result});

        },(error)=>{

            res.send({error:error});
    });

    // res -> error, list
}// ready for use

const getMyPosts = (req, res)=>{

    // req -> token

    console.log("getMyPost token->"+req.body.token);

    if(req.body.token != undefined){
        
        User.findOne({token:req.body.token}, (err, user)=>{

            if(err){
            
                res.send({error:'db token error'});
                console.log("db token error")
            
            }else if(user){

                Post.find({seller:user._id}, (err, result)=>{

                    if(err){

                        res.send({error:'seller id error'});
                        console.log("seller id error");

                    }else if(result){

                        res.send({list:result});
                        console.log("get my posts success! ->"+result);
                    }
                });
            }else{
                res.send({error:'user didnt found'})
            }
        });
    }else{

        res.send({error:'no token sent'})
    }
    // res -> error, list
}// ready for use

/*const viewPost = (req, res)=>{

    // req -> token, _id

    let id = req.body._id

    User.findOne({token:req.body.token}, (err, user)=>{

        if(user){

            Post.findOne({_id:id},(err, post)=>{

                if (err) {
                
                    console.error(err);
                    res.status(500).send({ error: err });
                
                } else if (post) {
                
                    res.send({post});
                    console.log(post);
                
                }else{
                    res.send({error:'notFound'})
                }
        
            });
        }else{

            res.send({error:'how the fuck are u trying to view post without registering?'});
        }
    })
    

    // res -> error, postObj
}*/// useless

const editPost = (req, res)=>{

    // req -> token, post

    User.findOne({token:req.body.token}, (err, user)=>{

        if (err) {
        
            console.error(err);
            
            res.status(500).send({ error: err });
            
        } else if (user) { 
            
            Post.findOne({_id:req.body.post._id}, (err, post)=>{

                if (err) {
        
                    console.error(err);
                    
                    res.status(500).send({ error: err });
                    
                } else if (post) {
                
                    if(user._id == post.seller.toString()){

                        Post.updateOne({_id:req.body.post._id}, req.body.post, (err, raw)=>{

                            if (err) {
                                console.error(err);
                                res.status(500).send({ error: err });
                            } else if (raw.nModified > 0) {
                                
                                console.log('post modified');
                                res.status(200).send({ result:200 });
                            } else {
                                res.status(400).send({
                                    error: `cant modify the post with ${
                                    req.body.post._id
                                    } as _id`
                                });
                            }
                        });

                    }else{

                        res.send({error:'not your post'})
                    }
                
                }else{
                    
                    res.send({error:'post notFound'})
                }
            });
            
        }else{
            
            res.send({error:'user notFound'})
        }
    })

    // res -> error, result
}

const deletePost = (req, res)=>{

    // req -> token, _id

    User.findOne({token:req.body.token}, (err, user)=>{

        if (err) {
        
            console.error(err);
            
            res.status(500).send({ error: err });
            
        } else if (user) { 
            
            Post.findOne({_id:req.body._id}, (err, post)=>{

                if (err) {
        
                    console.error(err);
                    
                    res.status(500).send({ error: err });
                    
                } else if (post) {
                
                    if(user._id == post.seller.toString()){

                        // TODO:: delete
                        Post.deleteOne({_id:post._id}, (err)=>{

                            if(err){

                                res.send({error:err});
                            }else{

                                res.send({result:200});
                            }
                        })

                    }else{

                        res.send({error:'not your post'})
                        console.log('userId:'+user._id+'-postSeller:'+post.seller);
                        
                    }
                
                }else{
                    
                    res.send({error:'notFound'})
                }
            });
            
        }else{
            
            res.send({error:'notFound'})
        }
    })

    // res -> error, result
}

module.exports = {createPost, getPosts, getMyPosts, editPost, deletePost};