const express = require('express')
const bcrypt = require('bcrypt')
const {User} = require('../models')

const router = express.Router();

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
        res.status(200).send('ok')
    }catch(error){
        console.log(error)
        next(error);
    }
})

router.delete('/', (req,res)=>{
    res.send({id:1})
})


module.exports = router;