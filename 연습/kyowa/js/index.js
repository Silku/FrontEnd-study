elem = $('#page-header,.v-item');

$(window).on('load resize', function(){
  //レスポンシブ切り替え
  var w = $(window).width();
  var x = 768;
  if (x < w) {
    $('body').removeClass('sp');
  } else if(w <= x){
    $('body').addClass('sp');
  }
});
$(window).on('load', function(){
  afterloadset();
  visibleelm();
});
///////////////////////////////////TOP main slider
$(window).on('load', function(){
  if($('#loading').hasClass('top')){
    $("body").addClass("load");
    $('#wrapper').delay(1200).queue(function(){
      $(this).addClass('on');
    });
  } else {
    $('#wrapper').addClass('on');
  }
});


///////////////////////////////////ページスクロール
$(function(){
  $('a[href^="#"]').click(function(){
    var adjust = 0;
    var speed = 800;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top + adjust;
    $('body,html').animate({scrollTop:position}, speed, 'swing');
    return false;
  });

  //上下判定
  // var timer = false;
  // var scroll = 0;
  // $(window).scroll(function() {
  //   if (timer !== false) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(function() {
  //     var sa = $(this).scrollTop()-scroll;
  //     // console.log(sa);
  //     if(sa > 10){
  //       $('header').addClass('hidden');
  //     } else if(sa < -1 ){
  //       $('header').removeClass('hidden');
  //     }
  //     scroll = $(this).scrollTop();
  //   }, 10);
  // });

  startPos = 0;
  $(window).on('scroll',function(){
    winScrollTop = $(this).scrollTop();
    if (winScrollTop >= startPos) {
      if(winScrollTop >= 50){
        $('header').addClass('hidden');
      }
    } else {
      $('header').removeClass('hidden');
    }
    startPos = winScrollTop;
    // console.log(startPos);
    visibleelm();
  });
  $(window).on('scroll', function(){
    var footer_h = $("footer").innerHeight() / 2;
    var docHeight = $(document).innerHeight(), //ドキュメントの高さ
        windowHeight = $(window).innerHeight(), //ウィンドウの高さ
        pageBottom = docHeight - windowHeight; //ドキュメントの高さ - ウィンドウの高さ
    if(pageBottom <= $(window).scrollTop() + footer_h) {
      var w = $(window).width();
      var x = 768;
      if (x < w) {
        $("header").removeClass('hidden');
      }      
    }
  });
});


///////////////////////////////////menubtn
$(function(){
  var htmlElm = $('html');
  //body固定関数
  var bodyElm = $('body');
  var scrollPosi;
  function bodyFix() {
    scrollPosi = $(window).scrollTop();
    bodyElm.css({
      'position': 'fixed',
      'width': '100%',
      'z-index': '1',
      'top': -scrollPosi
    });
  }  
  //body fixリセット
  function bodyFixReset() {
    bodyElm.css({
      'position': 'relative',
      'width': 'auto',
      'top':'auto'
    });
    //scroll位置を調整
    $("html, body").scrollTop(scrollPosi);
  }
  function menuclosedelay(){
    // $('html,body').removeClass('menu-open');
    setTimeout(function(){
      $('.g-menu').removeClass('off');
      $('html,body').removeClass('menu-open');
    }, 500);
  }
  $('.sp-menu-trg').click(function() {
    var w = $(window).width();
    var x = 768;
    if (x < w) {
      //pc
    } else if(w <= x){
      if($('.sp-menu-trg').hasClass('on')){
        $('.sp-menu-trg').removeClass('on');
        $('.g-menu').addClass('off');
        // $('html,body').removeClass('menu-open');
        menuclosedelay();
        bodyFixReset();
      } else {
        $('.sp-menu-trg').addClass('on');
        $('html,body').addClass('menu-open');
        bodyFix();
      }
    }
  });
  // $('.sp-menu-close').click(function() {
  //   $('html,body').removeClass('menu-open');    
  //   var w = $(window).width();
  //   var x = 768;
  //   if (x < w) {
  //     //pc
  //   } else if(w <= x){
  //     bodyFixReset();
  //   }    
  // });
});

$(function(){
  
});

function afterloadset(){
  //visual
  if($("#index-visual").length){
    gsap.to('.visual', {
      y: '-20%',
      scrollTrigger: {
        trigger: '#index-visual',
        start: 'top 40%',
        end: 'bottom 0%',
        markers: false,
        scrub: true,
      }
    });
  }

  if($(".section_about").length){
    gsap.to('.bg-text-about', {
      x: '0vw',
      scrollTrigger: {
        trigger: '#index-about-trg',
        ease: "power0",
        start: 'top 80%',
        end: 'top 30%',
        markers: false,
        scrub: true,
      }
    });
  }

  if($(".section_service").length){
    gsap.to('.bg-text-service', {
      x: '0vw',
      scrollTrigger: {
        trigger: '#index-service-trg',
        ease: "power0",
        start: 'top 80%',
        end: 'top 30%',
        markers: false,
        scrub: true,
      }
    });
  }

  if($(".bg-text-recruite").length){
    var rec_tw = $(".bg-text-recruite").width();
    $(window).on('scroll',function(){
      rec_tw = $(".bg-text-recruite").width();
    });
    gsap.to('.bg-text-recruite', {
      x: '-'+rec_tw+'px',
      scrollTrigger: {
        trigger: '.recruit-trg',
        ease: "power0",
        start: 'top 100%',
        end: 'bottom 0%',
        markers: false,
        scrub: true,
      }
    });
  }

}


function visibleelm(){
  ww = $(window).width();
  var isAnimate = 'visible';
  var wl = 3;
  if(ww < 768){
    wl = 3;
  }
  elem.each(function () {  
    var elemOffset = $(this).offset().top;
    var scrollPos = $(window).scrollTop();
    var wh = $(window).height();
    if(scrollPos > elemOffset - wh + (wh / wl) ){
      $(this).addClass(isAnimate);
    }
  });
}


