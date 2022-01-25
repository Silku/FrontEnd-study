    var boardDataset = [];
    
    $(document).ready(function() {
        var select_box = 	$(".btn_select");
    
        select_box.bind("click",function(){ 				// 셀렉트 박스 열고 닫기
            select_box.attr("aria-expanded","true");		
            $(".select_item").attr("aria-selected","false");					// 열려있는 모든 셀렉트박스 닫기
            //$(this).children(".select_item").toggleClass("on"); 	// 선택된 셀렉트 박스의 option 토글
            $(window).bind("click",function(){ 					// 셀렉트 박스가 선택되면 모든 윈도우에 이벤트 추가
                select_box.attr("aria-expanded","false");				// 모든윈도우가 클릭되면 옵션 박스 의 on 삭제
                $(window).unbind("click");							// 윈도우의 클릭이벤트 삭제
            });
            return false;
        });
        $('.select_item').bind('click', function(){ 				// 옵션 리스트 선택시 텍스트 교체
            $(this).attr("aria-selected","true");
            $('.btn_select').text($(this).text());
            $('#yearType').val($(this).attr("data-media_year"));
            //$('#yearType').val($(this).attr("data-yearType"));
            select_box.attr("aria-expanded","false");	
            $(window).unbind("click");	
            search();
            return false;
        });
        
        var selecteditem = $(".select_item[aria-selected='true']")
        if(selecteditem.length > 0){
            $('.btn_select').text(selecteditem.text());
        }
        
        setDataset();
        // nextPageAdd()
    });
    
    // function search() {
    //     searchForm.action ="promotion/ads"
    //     searchForm.submit();
    // }
    function search() {
        searchForm.action ="promotion/ads"
        searchForm.submit();
    }
    
    // function setDataset(){
    //     var pdata = $('#searchForm').serialize();	
    //     pdata.currentPage = 0;
    //     boardDataset
    //     UT.ajaxCall({	url: '/promotion/ads/getTvData',
    //         data : pdata, //전송 Data
    //         successCallbackFn : function(data, status) {
    //             if(data!=null){
    //                 boardDataset = data;	
    //             }
    //         }
    //     });
    // }

    function setDataset(){
        var pdata = $('#searchForm').serialize();	
        pdata.currentPage = 0;
        boardDataset
        UT.ajaxCall({	url: 'promotion/data.json',
            data : pdata, //전송 Data
            successCallbackFn : function(data, status) {
                if(data!=null){
                    boardDataset = data;	
                    console.log(boardDataset)
                }
                var prObj = null;
                if(data.length > 0){
                    var htmlString = '';
                    for(var i=0; i <data.length; i++){
                        prObj = data[i]
                        console.log(data.title)
                    }
                }
                // var prObj;
                // if(data.length > 0){				
                //     var htmlString = '';
                //     for(var i=0 ; i <data.length ; i++){
                        
                //         prObj = data[i];
                        
                //         htmlString = '<li class="report_list">';					
                //         htmlString += '<a href="javascript:;" onclick="showPopup(' + boardDataset.length + ')" >';
                        
                //         if(prObj.screenShotFilePath!=null && prObj.screenShotFilePath!=""){
                //             htmlString += '<div class="report_img_box" style="background-image: url(' + prObj.screenShotFilePath  +');"><span class="blind">기본이미지</span></div>';	
                //         }else{
                //             htmlString += '<div class="report_img_box" style="background-image: url(/img/ko/promotion/img_promotion_tv1.png);"><span class="blind">기본이미지</span></div>';
                //         }
                        
                //         htmlString += '<div class="report_info_box"><h3 class="report_info_title">';
                //         htmlString += prObj.title; //+prObj.mediaTitle2;
                //         htmlString += '</h3><span class="report_info_date">';
                //         htmlString += prObj.yearType;
                //         htmlString += '</span></div></a></li>';
                        
                //         boardDataset.push(prObj);
                //         report_container.append(htmlString);
                //     }				
                //     currentPage.val(parseInt(currentPage.val())+1);
                // }
                
                // if( data == null || data.length == 0 || prObj.endCount >=  prObj.rowCount ){
                //     $('#more_btn_area').hide();
                // }
            }
        });
    }
    
    // function nextPageAdd(){
    //     var report_container = $('#report_container');
    //     var currentPage = $('#currentPage');
    //     var pdata = $('#searchForm').serialize();	
    //     UT.ajaxCall({	url: '/promotion/ads/getMoreTv',
    //         data : pdata, //전송 Data
    //         successCallbackFn : function(data, status) {
    //             var prObj = null;
    //             if(data.length > 0){				
    //                 var htmlString = '';
    //                 for(var i=0 ; i <data.length ; i++){
                        
    //                     prObj = data[i];
                        
    //                     htmlString = '<li class="report_list">';					
    //                     htmlString += '<a href="javascript:;" onclick="showPopup(' + boardDataset.length + ')" >';
                        
    //                     if(prObj.screenShotFilePath!=null && prObj.screenShotFilePath!=""){
    //                         htmlString += '<div class="report_img_box" style="background-image: url(' + prObj.screenShotFilePath  +');"><span class="blind">기본이미지</span></div>';	
    //                     }else{
    //                         htmlString += '<div class="report_img_box" style="background-image: url(/img/ko/promotion/img_promotion_tv1.png);"><span class="blind">기본이미지</span></div>';
    //                     }
                        
    //                     htmlString += '<div class="report_info_box"><h3 class="report_info_title">';
    //                     htmlString += prObj.title; //+prObj.mediaTitle2;
    //                     htmlString += '</h3><span class="report_info_date">';
    //                     htmlString += prObj.yearType;
    //                     htmlString += '</span></div></a></li>';
                        
    //                     boardDataset.push(prObj);
    //                     report_container.append(htmlString);
    //                 }				
    //                 currentPage.val(parseInt(currentPage.val())+1);
    //             }
                
    //             if( data == null || data.length == 0 || prObj.endCount >=  prObj.rowCount ){
    //                 $('#more_btn_area').hide();
    //             }
    //         }
    //     });
    // }
    function nextPageAdd(){
        var report_container = $('#report_container');
        var currentPage = $('#currentPage');
        var pdata = $('#searchForm').serialize();	
        UT.ajaxCall({	url: 'promotion/data.json',
            data : pdata, //전송 Data
            successCallbackFn : function(data, status) {
                var prObj = null;
                if(data.length > 0){				
                    var htmlString = '';
                    for(var i=0 ; i <data.length ; i++){
                        
                        prObj = data[i];
                        
                        htmlString = '<li class="report_list">';					
                        htmlString += '<a href="javascript:;" onclick="showPopup(' + boardDataset.length + ')" >';
                        
                        if(prObj.screenShotFilePath!=null && prObj.screenShotFilePath!=""){
                            htmlString += '<div class="report_img_box" style="background-image: url(' + prObj.screenShotFilePath  +');"><span class="blind">기본이미지</span></div>';	
                        }else{
                            htmlString += '<div class="report_img_box" style="background-image: url(/img/ko/promotion/img_promotion_tv1.png);"><span class="blind">기본이미지</span></div>';
                        }
                        
                        htmlString += '<div class="report_info_box"><h3 class="report_info_title">';
                        htmlString += prObj.title; //+prObj.mediaTitle2;
                        htmlString += '</h3><span class="report_info_date">';
                        htmlString += prObj.yearType;
                        htmlString += '</span></div></a></li>';
                        
                        boardDataset.push(prObj);
                        report_container.append(htmlString);
                    }				
                    currentPage.val(parseInt(currentPage.val())+1);
                }
                
                if( data == null || data.length == 0 || prObj.endCount >=  prObj.rowCount ){
                    $('#more_btn_area').hide();
                }
            }
        });
    }
    

    var selectedVodIndex = -1;
    // function showPopup(rowIndx){
    //     if(boardDataset==null || boardDataset.length == 0){
    //         return;
    //     }
    //     selectedVodIndex = rowIndx;
    //     var prObj = boardDataset[rowIndx];
    //     var vodUrl = prObj.tvAdsFilePath ;
    //     var imgUrl = prObj.screenShotFilePath ;
    //     var title = prObj.title;
        
    //     $('#vod_mp4_source').attr('src', vodUrl);
    //     $('#vod_mp4_object').attr('data', vodUrl);
    //     $('#vod_mp4_param').attr('value', "image=&amp;file="+vodUrl);
    //     $('#vod_mp4_img').attr('src', imgUrl);
    //     $('#vod_mp4_img').attr('alt', prObj.tvAlt?prObj.tvAlt:'');
    //     $('#vod_mp4_img').attr('title', prObj.title);
    //     $('#vod_mp4_popup_title').text(title);
        
    //     if(rowIndx==0){
    //         $('#pop_btn_prev').hide();
    //     }else{
    //         $('#pop_btn_prev').show();
    //     }
        
    //     if(rowIndx>=(boardDataset.length-1)){
    //         $('#pop_btn_next').hide();
    //     }else{
    //         $('#pop_btn_next').show();
    //     }
        
    //     $("#popupVideo")[0].load();
    //     $('#popupDim').show();
    //     $('#mp4Popup').show();	
    // }
    function showPopup(rowIndx){
        if(boardDataset==null || boardDataset.length == 0){
            alert('데이터가 없습니다!')
            return;
        }
        selectedVodIndex = rowIndx;
        var prObj = boardDataset[rowIndx];
        var vodUrl = prObj.tvAdsFilePath ;
        var imgUrl = prObj.screenShotFilePath ;
        var title = prObj.title;
        
        $('#vod_mp4_source').attr('src', vodUrl);
        $('#vod_mp4_object').attr('data', vodUrl);
        $('#vod_mp4_param').attr('value', "image=&amp;file="+vodUrl);
        $('#vod_mp4_img').attr('src', imgUrl);
        $('#vod_mp4_img').attr('alt', prObj.tvAlt?prObj.tvAlt:'');
        $('#vod_mp4_img').attr('title', prObj.title);
        $('#vod_mp4_popup_title').text(title);
        
        if(rowIndx==0){
            $('#pop_btn_prev').hide();
        }else{
            $('#pop_btn_prev').show();
        }
        
        if(rowIndx>=(boardDataset.length-1)){
            $('#pop_btn_next').hide();
        }else{
            $('#pop_btn_next').show();
        }
        
        $("#popupVideo")[0].load();
        $('#popupDim').show();
        $('#mp4Popup').show();	
    }
    
    function prevVod(){
        if(selectedVodIndex-1 > -1){
            showPopup(selectedVodIndex-1);	
        }
    }
    
    function nextVod(){
        if(selectedVodIndex+1 <= boardDataset.length){
            showPopup(selectedVodIndex+1);	
        }
    }
    
    function closePopup(type){
        var video = $("#popupVideo")[0]; 
        if(video!=null){
            video.pause();	
        }
        
        $('#mp4Popup').hide();
        $('#popupDim').hide();	
    }
    