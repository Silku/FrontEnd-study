const express = require('express')

const {Post, User, Image, Comment} = require('../models')
const router = express.Router();

router.get('/', async (req,res,next)=>{
    try{
        const posts = await Post.findAll({
            // where : {Userid : lastId},
            limit : 5, //불러올 게시글 제한 
            order : [['createdAt', 'DESC']],
            include : [{
                model:User,
                attributes:{
                    exclude:['password']
                }
            },{
                model : Image,
            },{
                model: Comment,
                include:[{
                    model:User,
                    attributes : {
                        exclude:['password']
                    }
                }]
            }]
        })
        console.log('실행' + posts)
        res.status(200).json(posts);
    }catch(err){
        console.error(err)
        next(error)
    }
})

module.exports = router;