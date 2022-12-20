const passport = require('passport')
const {Strategy : LocalStrategy} =require('passport-local') //변수명을 이름변경하는 구조분해방법
const bcrpyt = require('bcrypt')
const {User} = require('../models')

module.exports = () =>{
    passport.use(new LocalStrategy({
        //front(saga)에서 보내준 data.email  => back에서는 req.body.email
        usernameField : 'email', 
        passwordField : 'password'
    },async (email, password, done)=>{
        try{
            const user = await User.findOne({ //findOne 비동기함수
                where : {email : email}
            })

            // 가입된 사용자가 없는 경우
            if(!user){
                return done(null, false, {reason : '존재하지 않는 사용자입니다.'}) //매개변수 : 서버에러 , 성공여부, 클라이언트에러
            }

            //비밀번호가 일치하지 않는 경우
            const result = await bcrpyt.compare(password, user.password); //compare 비동기함수
            if(result){
                return done(null, user)
            }
            return done(null, false , {reason : '비밀번호가 일치하지 않습니다.'});
            
        }catch(error){
            console.error(error)
            return done(error)
        }
    }));
}