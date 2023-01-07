const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs');

const {Post, User, Comment, Image, Hashtag} = require('../models')
const {isLoggedIn} = require('./middlewares');
const user = require('../models/user');

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
        const hashTags = req.body.content.match( /#[^\s#]+/g);
        const post = await Post.create({ 
            content : req.body.content,
            UserId : req.user.id,
        })
        if(hashTags){
            // findOrCreate : db에 있으면 가져오고 없으면 생성
            // slice()로 #을 떼고 toLowerCase로 대소문자 구분없이 소문자로 치환
            const result = await Promise.all(hashTags.map((tag) => Hashtag.findOrCreate({
                where : {content:tag.slice(1).toLowerCase()},
            })));
            await post.addHashtags(result.map((v) => v[0]))
        }
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


// 게시물 id에 따라 불러오기
router.get('/:postId', async (req,res ,next)=>{ //GET ,  post/1
    try{
        const post = await Post.findOne({
            where : {id : req.params.postId},
        })
        if(!post){
            return res.status(404).send('존재하지 않는 게시글 입니다.')
        }
        const fullPost = await Post.findOne({
            where : {id : post.id},
            include : [{
                model:Post,
                as : 'SharedPost',
                include : [{
                    model:User,
                    attributes:['id', 'nickname'],
                },{
                    model:Image
                }]
            },{
                model:User,
                attributes : ['id', 'nickname'],
            },{
                model:Image,
            },{
                model:User,
                as : 'Likers',
                attributes : ['id', 'nickname'],
            },{
                model:Comment,
                include:[{
                    model:User,
                    attributes : ['id', 'nickname']
                }]
            },{
                model : User, 
                as : 'Likers',
                attributes : ['id']
            }]
        })
        res.status(200).json(fullPost);
    }catch(error){
        console.error(error)
        next(error)
    }
})

// 게시글 공유하기(리트윗)
router.post('/:postId/retweet', isLoggedIn, async (req,res ,next)=>{ // post/1/retweet
    try{
        const post = await Post.findOne({
            where : {id : req.params.postId},
            include : [{
                model:Post,
                as : 'SharedPost'
            }]
        })
        if(!post){
            return res.status(403).send('존재하지 않는 게시글 입니다.')
        }
        // 방지하기 : 자기 게시글을 리트윗하는것, 자기게시글을 리트윗한 게시글을 다시 자기가 리트윗하는것 
        if(req.user.id === post.UserId || (post.SharedPost && post.SharedPost.UserId === req.user.id)){
            return res.status(403).send('본인의 글을 재 공유할 수 없습니다. ㅜㅜ')
        }
        const retweetTargetId = post.SharedPostId || post.id
        const exPost = await Post.findOne({
            where : {
                UserId : req.user.id,
                SharedPostId : retweetTargetId,
            }
        })
        if(exPost){
            return res.status(403).json('이미 공유된 게시글 입니다.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            SharedPostId : retweetTargetId,
            content : `@retweet`
        })
        const retweetWithPrevPost = await Post.findOne({
            where : {id : retweet.id},
            include : [{
                model:Post,
                as : 'SharedPost',
                include : [{
                    model:User,
                    attributes:['id', 'nickname'],
                },{
                    model:Image
                }]
            },{
                model:User,
                attributes : ['id', 'nickname'],
            },{
                model:Image,
            },{
                model:Comment,
                include:[{
                    model:User,
                    attributes : ['id', 'nickname']
                }]
            },{
                model : User, 
                as : 'Likers',
                attributes : ['id']
            }]
        })
        res.status(201).json(retweetWithPrevPost);
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