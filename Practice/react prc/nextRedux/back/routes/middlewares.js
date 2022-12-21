// /login, /logout등 페이지로 직접 접근할 떄 보안검사를 위한 미들웨어
exports.isLoggedIn = (req,  res, next) => {
    // isAuthenticated , passport에서 제공
    if(req.isAuthenticated()){
        // next()에 아무 매개변수가 없으면 다음미들웨어로 감
        next()
    }else{
        res.status(401).send('로그인이 필요합니다.')
    }
}
exports.isNotLoggedIn = (req,  res, next) => {
    // isAuthenticated , passport에서 제공
    if(!req.isAuthenticated()){
        next()
    }else{
        res.status(401).send('로그인이 필요합니다.')
    }
}