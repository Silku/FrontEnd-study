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
    if (Array.isArray(req.user)) {
      res.render('profile-passport.ejs', { user: req.user[0] });
    } else {
      res.render('profile-passport.ejs', { user: req.user });
    }
  });

  router.route('/auth/facebook').get(
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
    })
  );

  //callback 날라오는 url
  router.route('/auth/facebook/callback').get(
    passport.authenticate('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/',
    })
  );
};
