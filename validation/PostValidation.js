
module.exports = PostValidation = (post, user)=>{

    let errors = [];

    if(!(post.category == "book" || post.category == "dorm" || post.category == "cooking")){
        errors.push({for:'category', info:'unkown category!'});
    }

    if(!(post.com_type == "phone" || post.com_type == "telegram" || post.com_type == "instagram")){
        errors.push({for:'com_type', info:'unkown com_type!'});
    }

    if(post.title.length<4){
        errors.push({for:'name', info:'title should be complete'});
    }

    if(post.info.length<10){
        errors.push({for:'info', info:'info should be complete'});
    }

    if(post.com_id.length < 4){
        errors.push({for:'com_id', info:'enter the com_id'})
    }

    if(post.price<0){
        errors.push({for:'price', info:'price cannot be less than zero'});
    }

    if(!post.pic_n && post.pic_n < 1){

        errors.push({for:'pic_n', info:'you have to at least add 1 image of the good'})
    }

    if(user.post_n >= user.max_post){

        errors.push({for:'post_n', info:'you reached the maximum number of posts'});

        if(user.post_n > user.max_post){
            console.log('WTF !!! -> user.email:'+user.email+' has post_n more than its max_post');
        }
    }

    return errors;
}