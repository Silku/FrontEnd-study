module.exports = function (router, passport) {
  console.log('router_member 호출!');

  router.route('/').get((req, res) => {
    res.render('index-passport.ejs');
  });

  router.route('/login').get((req, res) => {
    res.render('login-passport.ejs');
  });

  router.route('/signup').get((req, res) => {
    res.render('signup-passport.ejs');
  });
  router.route('/signup').post(
    passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true,
    })
  );

  router.route('/login').post(
    passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
    })
  );

  //failureFlash : 회원가입 실패시 데이터 비워주는거
  router.route('/profile').get((req, res) => {
    if (!req.user) {
      console.log('사용자 인증에 실패했습니다.');
      res.redirect('/');
      return;
    }
    console.log('사용자 인증완료!');
    res.render('profile-passport.ejs');
  });
};
