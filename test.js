const User = require('./models/User');
const Post = require('./models/Post');


module.exports = {

    test:()=>{

    
        
        /*let user = User.findByToken('7EPhQwdaj2jSiQ51h5vUrPJxMhDFD4W2csKM2xbw75GZ', function(err, user){

            if(err){
                
                console.log(err);

            }else if(user){

                console.log(user);
            }else{
                console.log('user with such token not found!')
            }
        });*/

        /*let post = new Post({
        
            seller: '5bbe1c2e763ad480734b84d3',
            category: 'c',
            title: 'a',
            info: 'info',
            price: 2000,
            access_type: 'acc',
            images: ['','']
        });

        post.save((err)=>{

            if(err){
                console.log(err);
            }else{
                console.log(post);
            }
        })*/
    }
}

async function copy(i){

    await Post.create({
        university:"tehran-fouman",
        seller: `5bd0942872eeb3aa8ac46b09`,
        category: "dorm",
        title: "dildo",
        info: "ez pz ... is sqz",
        price: "2000",
        access_type: "uni", // next update
        com_type: "phone",
        com_id: "091155",
        pic_n: 1,
        valid: true,
        buyers: 0
    }).then(
        ()=>{
            return;
        }
    ).catch((reason)=>{

        console.log(reason);
    })
}