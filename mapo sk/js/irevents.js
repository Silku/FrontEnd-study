// var boardDataset = [];

// $(document).ready(function() {
//     setDataset();
// });


// function setDataset(){
//     var investors_table = $('.investors_table');
//     var currentPage = $('#currentPage');
//     var pdata = $('#searchForm').serialize();	
//     $.ajax({	
//         url: 'promotion/board.json',
//         data : pdata, //전송 Data
//         type:"get",
//         success : function(data) {
//             var prObj = null;
//             if(data.length > 0){				
//                 var htmlString = '';
//                 for(var i=0 ; i <data.length ; i++){
//                     prObj = data[i];
//                     boardDataset.push(prObj);
//                     // console.log(data[i])
//                     // console.log(prObj[0].title)
//                     htmlString = '<tr><td>'
//                     htmlString += '<p class="title ellipsis">'+prObj.title+ '</p></td>'
//                     htmlString += '<td class="date pr40">'+prObj.date+ '</td>'
//                     htmlString += '<td class="util_box"><div class="util_item link">'
//                                             +'<a href="'+prObj.contentsUrl+'"'+ 'target="_blank">공시</a></div></td>'
//                     htmlString += '<td class="util_box"><div class="util_item download">'
//                                             +'<a href="'+prObj.downloadFileUrl+'" role="button" target="_blank">PDF다운로드</a></div></td>'
//                     htmlString +='</tr>'
//                     // console.log(boardDataset)

//                     investors_table.append(htmlString);
//                     // test 
//                     // if(boardDataset.length>5){
//                     //     return
//                     // }else{  
//                     //     investors_table.append(htmlString);
//                     // }
//                 }
                
//                 //     htmlString += '<a href="javascript:;" onclick="showPopup(' + boardDataset.length + ')" >';
                    
//                 //     if(prObj.screenShotFilePath!=null && prObj.screenShotFilePath!=""){
//                 //         htmlString += '<div class="report_img_box" style="background-image: url(' + prObj.screenShotFilePath  +');"><span class="blind">기본이미지</span></div>';	
//                 //     }else{
//                 //         htmlString += '<div class="report_img_box" style="background-image: url(/img/ko/promotion/img_promotion_tv1.png);"><span class="blind">기본이미지</span></div>';
//                 //     }
//                 //     htmlString += '</span></div></a></li>';
//                 // }				
//                 // currentPage.val(parseInt(currentPage.val())+1);
//             }
//             if( data == null || data.length == 0 || prObj.s >=  prObj.rowCount ){
//                 $('#more_btn_area').hide();
//             }

//             // --pagination Start--
//             let totalData = boardDataset.length // 총 데이터 수
//             let dataPerPage = 5  // 한 페이지에 나타낼 데이터 수
//             let pageCount = 2   // 한 화면에 나타낼 페이지 수
//             function paging(totalData, dataPerPage, pageCount, currentPage){
//                 let totalPage = Math.ceil(totalData/dataPerPage); // 총 페이지 수
//                 var pageGroup = Math.ceil(currentPage/pageCount);  // 페이지 그룹
//                 var last = pageGroup * pageCount  // 화면에 보여질 마지막 페이지 번호
//                 if(last > totalPage)
//                 last = totalPage;
//                 var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
//                 var next = last+1;
//                 var prev = first-1;
//                 var $pingingView = $(".pagination");

//                 var htmlString = "";
//                 if(prev > 0)
//                 htmlString += '<a href=# id="prev" class="prev_page">이전페이지</a>';
            
//                 for(var i=first; i <= last; i++){
//                     htmlString += '<a href="#" id=' + i + '>' + i + '</a> ';
//                 }
            
//                 if(last < totalPage)
//                     htmlString += '<a href=# id="next" class="next_page">다음페이지</a>';
                
//                 $(".pagination").html(htmlString);    // 페이지 목록 생성
//                 $(".pagination a").css("color", "black");
//                 $(".pagination a#" + currentPage).css({"text-decoration":"none", 
//                                                 "color":"#00b843", 
//                                                 "font-weight":"bold"});    // 현재 페이지 표시
                                                
//                 $(".pagination a").click(function(){
                    
//                     var $item = $(this);
//                     var $id = $item.attr("id");
//                     var selectedPage = $item.text();
                    
//                     if($id == "next")    selectedPage = next;
//                     if($id == "prev")    selectedPage = prev;
                    
//                     paging(totalData, dataPerPage, pageCount, selectedPage);
//                 });
                
//             }
//             $("document").ready(function(){        
//                 paging(totalData, dataPerPage, pageCount, 1);
//             });

//             // 데이터 5개만 가져오도록
//             // console.log(boardDataset.length)
//             // console.log(boardDataset.slice(0,5))

//             // console.log(boardDataset.slice(5))
//         },
//         error : function(){
//             alert("에러");
//         }
//     });
// }


// ===========================================================


var boardDataset = [];
var selectedPageIndex = 1;

// 진행 내용 : selectedPageIndex를 전역변수로 잡고
//  pagination a click시 실행되는 selectedpage의 값을 어떻게든 밖으로 꺼낸다음 
//  writeData()가 실행될때 selectedpageIndex의 값을 받아 페이지 처리해보는 상상함
//  안되서 멘붕하고 퇴근함.

setInterval(() => {
    console.log("현재 선택된 페이지 : " + selectedPageIndex )
}, 1000);

$(document).ready(function() {
    setDataset();

});


function setDataset(){
    var investors_table = $('.investors_table');
    var pdata = $('#searchForm').serialize();	
    $.ajax({	
        url: 'promotion/board.json',
        data : pdata, //전송 Data
        type:"get",
        success : function(data) {
            var prObj = null;
            if(data.length > 0){				
                for(var i=0 ; i <data.length ; i++){
                    prObj = data[i];
                    boardDataset.push(prObj);
                }
            }

            // --pagination Start--
            let startPage = 1
            let totalData = boardDataset.length // 총 데이터 수
            let dataPerPage = 5  // 한 페이지에 나타낼 데이터 수
            let pageCount = 2   // 한 화면에 나타낼 페이지 수
            function paging(totalData, dataPerPage, pageCount, currentPage){
                let totalPage = Math.ceil(totalData/dataPerPage); // 총 페이지 수
                var pageGroup = Math.ceil(currentPage/pageCount);  // 페이지 그룹
                var last = pageGroup * pageCount  // 화면에 보여질 마지막 페이지 번호
                if(last > totalPage)
                last = totalPage;
                var first = last - (pageCount-1);    // 화면에 보여질 첫번째 페이지 번호
                var next = last+1;
                var prev = first-1;
                var $pingingView = $(".pagination");

                // 임시삽입 : a href irevents.html# 
                var htmlString = "";
                if(prev > 0)
                htmlString += '<a href="irevents.html#'+prev+'" id="prev" class="prev_page">이전페이지</a>';
            
                for(var i=first; i <= last; i++){
                    htmlString += '<a href="irevents.html#'+i+'" id=' + i + '>' + i + '</a> ';
                }
                
                if(last < totalPage)
                    htmlString += '<a href="irevents.html#'+next+'" id="next" class="next_page">다음페이지</a>';
                
                $(".pagination").html(htmlString);    // 페이지 목록 생성
                $(".pagination a").css("color", "#000000");
                $(".pagination a#" +currentPage).css({"text-decoration":"none", 
                                                "color":"#00b843", 
                                                "font-weight":"bold"});    // 현재 페이지 표시
                                                
                $(".pagination a").click(function(selectedPageIndex){
                    
                    var $item = $(this);
                    var $id = $item.attr("id");
                    var selectedPage = $item.text();
                    if($id == "next")    selectedPage = next;
                    if($id == "prev")    selectedPage = prev;
                    console.log(selectedPage + "번 페이지 선택됨")
                    paging(totalData, dataPerPage, pageCount, selectedPage);
                    console.log("총 데이터 : " + totalData, 
                                    "\n페이지당 노출 데이터 : " + dataPerPage, 
                                    "\n시작페이지 : "+startPage , 
                                    "\n현재 페이지 : " + selectedPage)
                    selectedPageIndex = parseInt(selectedPage)
                    console.log( "현재 페이지의 값 SPI : " + selectedPageIndex)
                    return selectedPageIndex;
                });
                // console.log("현재페이지 : " + currentPage)
                writeData(selectedPageIndex)

            }
            $("document").ready(function(){        
                paging(totalData, dataPerPage, pageCount, startPage);
            });

            // 데이터 5개만 가져오도록
            // console.log(boardDataset.slice(0,5))

            function writeData(selectedPageIndex){
                // console.log(boardDataset.slice(0,dataPerPage))
                // console.log(boardDataset.slice((0+dataPerPage),(dataPerPage+dataPerPage)))

                let data = boardDataset.slice(0,dataPerPage)
                console.log(data)
                console.log()
                let htmlString = "";
                for(let i = 0; i < dataPerPage; i++){
                    htmlString = '<tr><td>'
                    htmlString += '<p class="title ellipsis">'+data[i].title+ '</p></td>'
                    htmlString += '<td class="date pr40">'+data[i].date+ '</td>'
                    htmlString += '<td class="util_box"><div class="util_item link">'
                                            +'<a href="'+data[i].contentsUrl+'"'+ 'target="_blank">공시</a></div></td>'
                    htmlString += '<td class="util_box"><div class="util_item download">'
                                            +'<a href="'+data[i].downloadFileUrl+'" role="button" target="_blank">PDF다운로드</a></div></td>'
                    htmlString +='</tr>'
                    investors_table.append(htmlString);
                }
                // console.log(" 데이터 쓰기 중 현재 페이지 확인용 " + selectedPageIndex)
            }
        },
        error : function(){
            alert("에러");
        }
    });
}

