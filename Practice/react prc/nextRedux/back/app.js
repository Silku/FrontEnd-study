const express = require('express')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const dotenv = require('dotenv')

const postRouter = require('./routes/post')
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
app.use(cors({
    origin:'*',
    credentials : 'false',
}))
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
    res.send('hello express')
})

app.get('/api', (req,res)=>{
    res.json([
        {id:1 , content:'hello1'},
        {id:2 , content:'hello2'},
        {id:3 , content:'hello3'}
    ])
})

app.use('/post', postRouter);
app.use('/user', userRouter);

// http://localhost:3065/user

app.listen(3065, ()=>{
    console.log('서버실행 ..')
});
