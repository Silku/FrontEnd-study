window.addEventListener("wheel", function(e){
    e.preventDefault();
},{passive : false});

var mHtml = $("html");
var page = 1;
mHtml.animate({scrollTop : 0}, 1000);




$(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;
    if(e.originalEvent.deltaY > 0) {
    // deltaY > 0 휠을 아래로 스크롤할때
        if(page == 7){
            page = 0;
            return
        }
        // return;
        page++;
    }else if(e.originalEvent.deltaY < 0) {
    // deltaY < 0 휠을 위로 스크롤할때
        if(page == 1) return;
        page--;
    }
    // 페이지 높이만큼 스크롤
    var posTop =(page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop});
})