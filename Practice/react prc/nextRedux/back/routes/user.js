const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')

const {User, Post} = require('../models');

const router = express.Router();

//로그인
router.post('/login', (req,res,next)=>{
    passport.authenticate('local', (err,user,info)=>{ //POST/user/login
        //passport/local.js 에서 전달받은 매개변수 
        //서버에러 , 성공여부, 클라이언트에러  : null,false,{} => (err,user,info)
        if(err){
            console.error(err);
            return next(error);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr)=>{ //passport 로그인
            if(loginErr){
                console.err(loginErr)
                return(loginErr);
            }

            // 사용자 정보 가져오기(게시물 ,팔로잉 등)
            const userInfoWithoutPassword = await User.findOne({
                where:{id:user.id},
                // attributes : ['email', 'password'] 처럼 db로부터 원하는 키워드의 컬럼만 가져올수 있음, exclude는 해당 컬럼 제외하기
                attributes : {
                    exclude:['password']
                },
                include : [{
                    model:Post
                },{
                    model:User,
                    as:'Followings',
                },{
                    model:User,
                    as:'Followers',
                }]
            })
            return res.json(userInfoWithoutPassword)
        })
    })(req,res,next) //미들웨어 확장,express 기법
})


router.post('/', async (req,res, next)=>{ //POST/user
    try{
        const exUser = await User.findOne({
            where : {
                email : req.body.email,
            }
        })
        if (exUser){
            //send는 마지막에 한번 씀.
            // 요청한번에 응답도 한번 일어나므로 여기서는 return을 붙여줘야함.
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        // 비동기함수들은 await 붙여줌, 공식문서 보고 알아야함.
        const hashedPassword = await bcrypt.hash(req.body.password,10) //암호화하는 해시숫자 : 10~13정도 씀, 높을수록 강력하나 고사양 요구
        await User.create({
                email : req.body.email,
                nickname : req.body.nickname,
                password : hashedPassword,
            })
        // res.json();
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060')
        res.status(201).send('ok')
    }catch(error){
        console.log(error)
        next(error);
    }
}) 

router.post('/user/logout', (req,res,next)=>{
    req.logout();
    req.session.destroy();
    res.send('ok');
})


module.exports = router;