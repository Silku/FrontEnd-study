$(document).ready(function () {
  //--메뉴--
  $(function () {
    $('.s_mn > li  ').hide();

    $('.m_mn > li').mouseenter(function () {
      $(this).find('.s_mn > li ').slideDown();
      /*
        $(this).find('s_mn).show();
        $(this).find('s_mn).fadeIn();
        $(this).find('s_mn).animate();
        $(this).find('s_mn).slideDown();
        */
    });
    $('.m_mn > li').mouseleave(function () {
      $(this).find('.s_mn > li ').slideUp();
    });
  });

  //--메뉴 호버--
  $('.m_mn > li').hover(
    function () {
      $(this).css({ color: '#aa3344' });
    },
    function () {
      $(this).css({ color: '#red' });
    }
  );

  // --메인슬라이드

  let current = 0;
  let setIntervalId;

  function move(i) {
    var currentEl = $('.imgs > li').eq(current);
    var nextEl = $('.imgs > li').eq(i);

    currentEl.css({ left: '0%' }).animate({ left: '-100%' });
    nextEl.css({ left: '100%' }).animate({ left: '0%' });

    current = i;
  }

  function move_return(i) {
    var currentEl = $('.imgs > li').eq(current);
    var nextEl = $('.imgs > li').eq(i);

    currentEl.css({ left: '0%' }).animate({ left: '100%' });
    nextEl.css({ left: '-100%' }).animate({ left: '0%' });
    current = i;
  }

  timer();
  function timer() {
    // setInterval(실행함수, 시간)
    //clearInterval(setInterval 적용된 함수)

    setIntervalId = setInterval(function () {
      var n = current + 1;
      if (n > 2) {
        n = 0;
      }
      move(n);
    }, 1500);
  }

  $('#main_img').mouseover(function () {
    clearInterval(setIntervalId);
  });
  $('#main_img').mouseout(function () {
    timer();
  });

  $('.btns > li').click(function (e) {
    e.preventDefault();
    let i = $(this).index();
    // console.log(i);
    move(i);
  });

  $('.l_btn').click(function () {
    let l = current - 1;
    if (l > 2) {
      l = 0;
    }
    move(l);
  });
  $('.r_btn').click(function () {
    let r = current + 1;
    if (r > 2) {
      r = 0;
    }
    move_return(r);
  });
  // ---퀵메뉴 트레이싱
  var box = $('#all > .box');

  $('#q_mn li').click(function () {
    let qbt = $(this).index();
    let currentbox = box.eq(qbt);
    let tg = currentbox.offset().top;
    /*
    position();부모값
    offset(); 자기
    console.log(tg);
    */
    $('html,body').stop().animate({ scrollTop: tg });
  });

  $(window).scroll(function () {
    var sct = $(window).scrollTop() + 200;
    $('#q_mn')
      .stop()
      .animate({ top: sct + 'px' }, 600);
  });

  // --미니슬라이드;
  // $('.con01_btns > li').click(function () {
  //   var num = $(this).index();

  //   slide_img(num);
  // });
  // function slide_img(num) {
  //   posX = num * 360 + 'px';
  //   $('.in_box > ul').animate({ left: posX }, 600);
  // }

  $('.con05').mouseover(function () {
    $('.con05').animate({ width: '300px' });
  });
});
