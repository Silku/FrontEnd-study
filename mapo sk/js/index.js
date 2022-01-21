const body = document.querySelector('body');
const header = document.querySelector('header');


// header.style.display = "none"
// header.style.backgroundColor = "#fff"

// header.style.color = "#ababab";


// 스크롤시 헤더가 가리는 기능
// https://webdir.tistory.com/481
let didScroll;
let lastScrollTop = 0; 
let delta = 5; // 동작의 구현이 시작되는 위치 
let navbarHeight = $('header').outerHeight(); // 영향을 받을 요소를 선택

// 스크롤시에 사용자가 스크롤했다는 것을 알림 
$(document).ready(function(){
    $(window).scroll(function(event){
        didScroll = true;
    })

    setInterval(function(){
        if(didScroll){
            hasScrolled();

            didScroll = false;
        }
    },250);
    
    function hasScrolled(){
        console.log('스크롤됨')
        var st = $(this).scrollTop();

        if(Math.abs(lastScrollTop - st) <= delta)
        return;

        if(st > lastScrollTop && st > navbarHeight){
            $('header').removeClass('nav-down').addClass('nav-up');
        }else{
            if(st + $(window).height() < $(document).height()){
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        lastScrollTop = st;
    }
    

    // 네비바 호버시 기능
    $('.g_nav').delegate('.g_nav_menu', 'mouseenter', function(){
		$(this).find('.g_nav_drop_cont').stop().slideDown(500);
	});
	$('.g_nav').delegate('.g_nav_menu', 'focusin', function(){
		$(this).find('.g_nav_drop_cont').stop().slideDown(500);
	});
    $('.g_nav').delegate('.g_nav_menu', 'mouseleave', function(){
		$(this).find('.g_nav_drop_cont').stop().slideUp(250);
	});
	$('.g_nav').delegate('.g_nav_menu', 'focusout', function(){
		$(this).find('.g_nav_drop_cont').stop().slideUp(250);
	});
	
	$('.btn_sitemap').click(function() {
		$(this).attr("aria-expanded", true);
		$('header').toggleClass('active');
    })
});

// Math.abs 주어진 숫자의 절대값을 반환함.


$(document).ready(function() {
	var btn_affiliate = $(".btn_affiliate");
	
	btn_affiliate.bind("click",function(){ 				// 셀렉트 박스 열고 닫기
		btn_affiliate.attr("aria-expanded","true");		
		$(window).bind("click",function(){ 					// 셀렉트 박스가 선택되면 모든 윈도우에 이벤트 추가
			btn_affiliate.attr("aria-expanded","false");				// 모든윈도우가 클릭되면 옵션 박스 의 on 삭제
			$(window).unbind("click");							// 윈도우의 클릭이벤트 삭제
		});
		return false;
	});
	
	$(".affiliate_item").click(function(){
		$(".btn_affiliate").attr('aria-expanded', 'false');
	});
});





// swiper.js

// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
//     // autoplay:{
//     //     delay:2000
//     // },
//     speed:1500,
//     fadeEffect:{
//         crossFade:true
//     },
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
// },

// // And if we need scrollbar
// scrollbar: {
//     el: '.swiper-scrollbar',
// },
// });

// swiper.autoplay.start();

$(function(){
    var mainSwiper = new Swiper('.main_slide', {
        effect: 'slide', // 'slide'(default), 'fade'
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false, 
        //     //사용자 상호 작용 후 자동 재생이 중지되지 않으며 매회 다시 시작
        // },
        speed: 1500,
        fadeEffect: {
            crossFade: true //이펙트가 'fade'일 경우
        },
        loop: true,
        setWrapperSize: true, //모든 슬라이드의 총 너비/높이 설정
        navigation: {
            prevEl : '.btn_prev',
            nextEl : '.btn_next',
        },
        threshold: 300 // 임계값이 300이상일 때만 스와이퍼 작동
    });
    
    // mainSwiper.autoplay.start(); //자동 재생 시작
    
    //현재 슬라이드에 맞춰 .slide_info_container 변화
    mainSwiper.on('slideChangeTransitionStart', function() {
        var mainIdx = parseInt($('.swiper-slide-active').attr('data-index'));
        $(".current").text(mainIdx+1); //현재 슬라이드 페이지
        var progress = (mainIdx+1) * 16.7;
        $(".fill").css("width", progress+"%"); //현재 슬라이드 진행바
        $(".slide_info_box").each(function(index) { //현재 슬라이드 텍스트
            if (index == mainIdx) {
                $(this).fadeIn(1000); //speed
            } else {
                $(this).hide();
            }
        });
    });

});

