const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')

const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const db = require('./models');
const { urlencoded } = require('express');

const passportConfig = require('./passport');


const app = express();
db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공 !')
    })
    .catch(console.error)

dotenv.config();
passportConfig();


//이 부분은 다른 라우터들보다 상단에 위치해야함.\
app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials : true,
}))
app.use('/', express.static(path.join(__dirname, 'uploads')))  //__dirname + 'uploads' 처럼 쓰지 않는 이유는 운영체제(mac)에 따라 경로가 달라질수 있기때문

app.use(express.json()) //json데이터 처리 
app.use(urlencoded({extended:true})) //form(url)데이터 처리
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
        saveUninitialized : false,
        resave : false,
        secret : process.env.COOKIE_SECRET,
    }
));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req,res)=>{
    res.send('hello express')
})



app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

// 에러처리 미들웨어 커스텀하기
app.use((err, req, res, next)=>{

})

// http://localhost:3065/user
app.listen(3065, ()=>{
    console.log('서버실행 ..')
});
