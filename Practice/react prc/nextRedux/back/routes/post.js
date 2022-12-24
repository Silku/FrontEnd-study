const express = require('express')

const {Post, User, Comment, Image} = require('../models')
const {isLoggedIn} = require('./middlewares')

const router = express.Router();

// 게시글 작성
router.post('/', isLoggedIn, async (req,res ,next)=>{ //Post/post
    try{
        const post = await Post.create({
            content : req.body.content,
            UserId : req.user.id,
        })
        
        const fullPost = await Post.findOne({
            where:{id:post.id},
            include : [{
                model : Image,
            },{
                model : Comment, 
                include : [{
                    model : User,//댓글 작성자
                    attributes : ['id', 'nickname'], 
                }]
            },{
                model : User, //게시글작성자
                attributes : ['id', 'nickname'],
            },{
                model : User, //좋아요 누른 사람
                as : 'Likers', //(model: post)에서 Likers라고 생성해준대로 가져와야됨
                attributes : ['id',]
            }]
        })
        res.status(201).json(fullPost);
    }catch(err){
        console.error(err)
        next(err)
    }
})

// 댓글작성
router.post('/:postId/comment', isLoggedIn, async (req,res ,next)=>{ // post/1/comment
    // :변수명 해주면 동적으로 값 바뀜
    // redux-saga값 : axios.post(`/post/${data.postId}/comment`,data)
    try{
        // 게시글이 실제로 존재하지 않는 경우
        const post = await Post.findOne({
            where : {id : req.params.postId}
        })
        if(!post){
            return res.status(403).send('존재하지 않는 게시글 입니다.')
        }
        // 댓글작성
        const comment = await Comment.create({
            content : req.body.content,
            PostId : parseInt(req.params.postId, 10),
            UserId : req.user.id,
        })
        const fullComment =  await Comment.findOne({
            where : {id : comment.id},
            include : [{
                model:User,
                attributes : ['id', 'nickname'],
            }]
        })
        res.status(201).json(fullComment);
    }catch(err){
        console.error(err)
        next(err)
    }
})

// 좋아요
router.patch('/:postId/like', isLoggedIn, async (req,res,next)=>{
    try{
        const post = await Post.findOne({
            where:{id:req.params.postId}
        })
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.')
        }
        await post.addLikers(req.user.id);
        res.json({PostId: post.id, UserId : req.user.id})
    }catch(err){
        console.error(err)
    }
})

//좋아요 취소
router.delete('/:postId/like', isLoggedIn, async (req,res,next)=>{
    try{
        const post = await Post.findOne({
            where:{id:req.params.postId}
        })
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.')
        }
        await post.removeLikers(req.user.id);
        res.json({PostId: post.id, UserId : req.user.id})
    }catch(err){
        console.error(err)
    }
})

router.delete('/:postId', isLoggedIn, async (req,res)=>{
    try{

        await Post.destroy({
            where:{id: req.params.postId},
            UserId : req.user.id, //내 아이디
        })
        console.log('삭제된 포스트 : post/' + req.params.postId)
        // params는 문자열이다.
        res.status(200).json({PostId:parseInt(req.params.postId)})
    }catch(err){
        console.error(err)
    }
})


module.exports = router;