const body = document.querySelector('body');
const header = document.querySelector('header');


// header.style.display = "none"
// header.style.backgroundColor = "#fff"




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
    
    $('.g_nav').delegate('.g_nav_menu', 'mouseenter', function(){
		$(this).find('.g_nav_drop_cont').stop().slideDown(500);
	});
    $('.g_nav').delegate('.g_nav_menu', 'mouseleave', function(){
		$(this).find('.g_nav_drop_cont').stop().slideUp(250);
	});
	$('.g_nav').delegate('.g_nav_menu', 'focusin', function(){
		$(this).find('.g_nav_drop_cont').stop().slideDown(500);
	});
	$('.g_nav').delegate('.g_nav_menu', 'focusout', function(){
		$(this).find('.g_nav_drop_cont').stop().slideUp(250);
	});
	
	// $('.btn_sitemap').click(function() {
	// 	$(this).attr("aria-expanded", true);
	// 	$('header').toggleClass('active');
    // })
});

// Math.abs 주어진 숫자의 절대값을 반환함.
