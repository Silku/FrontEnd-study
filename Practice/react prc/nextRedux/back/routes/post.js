const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs');

const {Post, User, Comment, Image} = require('../models')
const {isLoggedIn} = require('./middlewares')

const router = express.Router();

try{
    fs.accessSync('uploads')
}catch(error){
    console.log('업로드 폴더가 없으므로 생성합니다.')
    fs.mkdirSync('uploads')
}

// 이미지 업로드
const upload = multer({
    // 하드디스크에 저장
    storage:multer.diskStorage({
        destination(req,file,done){
            done(null, 'uploads')
        },
        filename(req,file,done){ //사과.png
            const ext = path.extname(file.originalname); //확장자추출(.png)
            const basename = path.basename(file.originalname, ext) //사과
            done(null, basename + '_' +new Date().getTime() + ext) //사과2212300101.png
        }
    }),
    limits : {fileSize:20*1024*1024} //20mb
});


// 게시글 작성
router.post('/', isLoggedIn, upload.none(), async (req,res ,next)=>{ //Post/post
    try{
        const post = await Post.create({
            content : req.body.content,
            UserId : req.user.id,
        })
        if(req.body.image){
            if(Array.isArray(req.body.image)){ //이미지 여러개 올리면 image : [사과.png, 바나나.png]
                const images = await Promise.all(req.body.image.map((image) => Image.create({src:image})));
                await post.addImages(images);
                }else{
                const image = await Image.create({src:req.body.image})
                await post.addImages(image);
            }
        }
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
    }catch(error){
        console.error(error)
        next(error)
    }
})



router.post('/images', isLoggedIn, upload.array('imagefiles'), async(req,res, next)=>{//POST, /post/images
    console.log(req.files);
    res.json(req.files.map((v) => v.filename))
} )

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
    }catch(error){
        console.error(error)
        next(error)
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