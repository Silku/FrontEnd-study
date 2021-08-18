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

//--슬라이드
var current = 0;
var setIntervalId;
$(document).ready(function () {
  var current = 0;

  $('btns > li').click(function (e) {
    e.preventDefault();
    var i = $(this).index();
    move(i);
  });
});

$('.l_btn').click(function () {
  var l = current - 1;
  if (l == 3) {
    l = 0;
  }
  move(l);
});

$('.r_btn').click(function () {
  var r = current + 1;
  if (r == 3) {
    r = 0;
  }
  move_return(r);
});

$('#main_img').on({
  mouseover: function () {
    clearInterval(setIntervalId);
  },
  mouseout: function () {
    timer();
  },
});

// 자동전환
timer();
function timer() {
  setIntervalId = setInterval(function () {
    var n = current + 1;
    if (n == 3) {
      n = 0;
    }
    move(n);
  }, 2000);
}

function move(i) {
  if (current == i) return;
  var currentEl = $('.imgs> li').eq(current);
  var nextEl = $('.imgs> li').eq(i);

  currentEl.css({ left: '0%' }).animate({ left: '-100%' });
  nextEl.css({ left: '100%' }).animate({ left: '0%' });

  current = i;
}

function move_return(i) {
  if (current == i) return;
  var currentEl = $('.imgs > li').eq(current);
  var nextEl = $('.imgs > li').eq(i);

  currentEl.css({ left: '0%' }).animate({ left: '100%' });
  nextEl.css({ left: '-100%' }).animate({ left: '0%' });

  current = i;
}
