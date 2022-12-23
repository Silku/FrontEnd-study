const express = require('express')

const {Post, User, Image, Comment} = require('../models')
const router = express.Router();

router.get('/', async (req,res,next)=>{
    try{
        const posts = await Post.findAll({
            // where : {Userid : lastId},
            limit : 5, //불러올 게시글 제한 
            // 비밀번호는 '반드시' 제외하고..
            order : [
                ['createdAt', 'DESC'],
                [Comment, 'createdAt', 'DESC']
            ],
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
            },{
                model : User, //좋아요 누른 사람
                as : 'Likers', //(model: post)에서 Likers라고 생성해준대로 가져와야됨
                attributes : ['id',]
            }
            ]
        })
        console.log('실행' + posts)
        res.status(200).json(posts);
    }catch(err){
        console.error(err)
        next(error)
    }
})

module.exports = router;