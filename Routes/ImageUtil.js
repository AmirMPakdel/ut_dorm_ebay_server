const fs = require('fs');

const getImage = (req, res)=>{

    console.log(req.query.name);

    fs.readFile(`./images/posts/${req.query.name}.jpg`,(err, data)=>{

        if(!err){
            res.writeHead(200, {'Content-Type': 'image/jpeg' });
            res.end(data, 'binary');
        }else{
            res.send(err);
        }
    })
}

const postPic = (req, res)=>{

    
    //console.log(req.body);

    let buf = Buffer.from(req.body.data, 'base64'); // Ta-da
    
    fs.writeFile(`./images/posts/${req.body.name}.jpg`, buf, (err)=>{

        if(!err){
            res.send({result:200});
            
        }else{
            console.log(err);
        }
    })
}

module.exports = { getImage, postPic}