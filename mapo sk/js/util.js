/* replaceAll */
function replaceAll(str,searchStr,replaceStr) {
	var rtnStr = "";
	try	{
		rtnStr = str.split(searchStr).join(replaceStr);
	}catch(e){ 
		rtnStr = "";
	}	
	return rtnStr;
}

function maskAOn(){}
function maskAOff(){}

var TMsg = {
saveConfirmMsg:'저장하시겠습니까?',
insertConfirmMsg:'등록하시겠습니까?',
deleteConfirmMsg:'삭제하시겠습니까?',
selectConfirmMsg:'조회하시겠습니까?',
updateConfirmMsg:'수정하시겠습니까?',
saveRsltMsg:'저장하였습니다.',
insertRsltMsg:'등록하였습니다.',
deleteRsltMsg:'삭제하였습니다.',
selectRsltMsg:'조회하였습니다.',
updateRsltMsg:'수정하였습니다.',
errormsg:'담당자에게 문의하시기 바랍니다.',
yes:'예',
no:'아니오',
confirm:'확인',
alert:'알림',
}

var UT = {
	/**
     * 날짜 객체의 복사
     * @method dateCopy
     * @param {Date} dateInfo - 복사하려는 날짜 객체
     * @returns {Date} 복사된 날짜 객체
     */
    dateCopy : function(dateInfo) {
    	var newDate = new Date();
    	newDate.setTime(dateInfo.getTime());
    	return newDate;
    },

	/**
     * alert dialog
     *
     * @method alert
     * @param {string}   key      message-Key
     * @param {string}   message      출력할 메시지
     * @param Array or object [ String / intger ...] StringFormat 치환용 변수
     * @param {function} [okCallback] ok 버튼 클릭 후 콜백 함수
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.alert("common.pagetotalcnt","전체{0},{1}건1",["10","20"]);
     *         UT.alert("","전체{0}건 메세지",10); 
     *     }
     */
    alert: function(key,message, values, okCallback) {        
    		
    	UT.mAlert(UT.transMsg(key,message, values));        
        if (UT.isFunction(okCallback)) {
             okCallback.call(this);
        }
    },
    
    /***
     * transMsg
     * 
     * @method transMsg
     * @param {string}   key      message-Key
     * @param {string}   message      출력할 메시지
     * @param Array or object [ String / intger ...] StringFormat 치환용 변수
     * @returns 다국어 및 Format적용 치환 메세지 String
     */
    transMsg: function(key,message, values){
    	var msg = message;    	
    	if(UT.isEmpty(key)){
    		if(UT.isNotEmpty(values)){
    			msg= UT.formatString(message,values);
    		}
    	}else{
    		msg = I18N.translate(key,message,values);
    	}   
    	return msg;
    },
    
    /**
     * confirm dialog
     *
     * @method confirm
     * @param {string}   key      message-Key
     * @param {string}   message  출력할 메시지
     * @param Array or object [ String / intger ...] StringFormat 치환용 변수
     * @param {function} [yesCallback] ok 버튼 클릭 후 콜백 함수
     * @param {function} [noCallback]  no 버튼 클릭 후 콜백 함수
     * @async
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.confirm("common.alert.registerconfirm","등록하시겠습니까?",null, function() {
     *             // yes
     *             ...
     *         }, function() {
     *             // no
     *             ...
     *         });
     *         
     *         
     *         UT.confirm("","{0}를 등록하시겠습니까?","메뉴", function() {
     *             // yes
     *             ...
     *         }, function() {
     *             // no
     *             ...
     *         });
     *     }
     */
    confirm: function( key,message, values, yesCallback, noCallback) {    	
    	var resultRtn = confirm(UT.transMsg(key,message, values));    	
    	if(resultRtn){
    		 if (UT.isFunction(okCallback)) {
    			 yesCallback.call(this);
            }
    	}else{
    		 if (UT.isFunction(okCallback)) {
    			 noCallback.call(this);
            }
    	}
    },
    
    /**
     * @method cConfirm 사용자 Confirm 창 출력
     * 
     * @param {Object} confirmParam
     		confirmParam = {
     								title: "확인",  //기본값 "확인"
     								message: "저장하시겠습니까?",  
     								yesCallback: function(){....},
     								noCallback: function(){....},
     								rsltCallback: function(rslt){....}, // rslt : boolean 
     								yesText: "예",   //기본값 "예"
     								noText: "아니오",   //기본값 "아니오"
     								divFrm : divHtmlElement, // 기본값 : <div title='확인'> message </div>
     								width: 400, // 기본값:400
     								height: 230, // 기본값:160
     								resizable : true, // 기본값 : false
     								modal : true, // 기본값 : true
     								}     
     */
    mConfirm: function( confirmParam , yesCallbackFn , noCallbackFn){    	
    	confirmParam = confirmParam || {};    	
    	var me = this;
    	var title = confirmParam.title || TMsg.confirm;
    	var message = confirmParam.message || "";
    	// confirmParam 에 String message 만 들어오는 경우 처리
    	if(UT.isNotEmpty(confirmParam) && !UT.isObject(confirmParam) && UT.isString(confirmParam)){
    		message = confirmParam;
    	}
    	message = replaceAll(message,"\n","<br>");// 줄바꿈 처리 
    	var defaultDiv = $(document.createElement('div'));
    	defaultDiv.css("display","table");
    	defaultDiv.attr("title",title);    	
    	defaultDiv.html( "<div style='display: table-cell; vertical-align: middle; padding:10px 0px 0px 0px'>" + message + "</div>");
    	$("body").append(divFrm);
    	var divFrm = confirmParam.divFrm || defaultDiv ;
    	var yesText = confirmParam.yesText || TMsg.yes;
    	var noText = confirmParam.noText || TMsg.no;
    	var mWidth = confirmParam.width || 400 ;
    	var mHeight = confirmParam.height || "auto";
    	var mResizable = confirmParam.resizable!=null?confirmParam.resizable:false;
    	var mModal = confirmParam.modal!=null?confirmParam.modal:true;
    	
    	var result = false;;
    	
    	var buttonArray = [
    		{
				text : yesText ,
				click :  function (){
		    		if (UT.isFunction(confirmParam.yesCallback))	{confirmParam.yesCallback.call(me)};// YES 후처리 CallBack		
		    		if (UT.isFunction(yesCallbackFn)) {yesCallbackFn.call(me)};// YES 후처리 CallBack		
					if (UT.isFunction(confirmParam.rsltCallback))	{confirmParam.rsltCallback.call(me,true)};// true/false 리턴 함수
					result = true;
					$(this).dialog("close");
		    	}
    		},
    		{
    			text : noText ,				
				click :  function (){
					if (UT.isFunction(confirmParam.noCallback)){confirmParam.noCallback.call(me);}// NO 후처리 CallBack	
					if (UT.isFunction(noCallbackFn)) {noCallbackFn.call(me)};// YES 후처리 CallBack		
					if (UT.isFunction(confirmParam.rsltCallback))	{confirmParam.rsltCallback.call(me,false)};// true/false 리턴 함수
					result = true;
					$(this).dialog("close");
		    	}
    		},
    	];
    	if(buttonArray[0].text.length < 4) {	buttonArray[0].width = 60;}
    	if(buttonArray[1].text.length < 4) {	buttonArray[1].width = 60;}

    	divFrm.dialog({
			resizable: mResizable,
			width: mWidth,
			height: mHeight,
			modal: mModal,
			buttons: buttonArray,
			open : function(){	maskAOn();
										var closeBtn = $(".ui-dialog-titlebar-close");
										closeBtn.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close');
										closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-close"></span>');
									 },
			close : function(){
										if(!result){
											if (UT.isFunction(confirmParam.noCallback)){confirmParam.noCallback.call(me);}// NO 후처리 CallBack	
											if (UT.isFunction(noCallbackFn)) {noCallbackFn.call(me)};// YES 후처리 CallBack		
											if (UT.isFunction(confirmParam.rsltCallback))	{confirmParam.rsltCallback.call(me,false)};// true/false 리턴 함수
											result = true;
										}
										maskAOff(); 
									},
		});
    },
    
    /***
     * 
     * @param {Object} alertParam
     		alertParam = {
     								title: "알림",  //기본값 "알림"
     								message: "저장 성공했습니다.",  
     								okCallback: function(){....},
     								okText: 확인",   //기본값 "확인"     								
     								divFrm : divHtmlElement, // 
     								width: 400, // 기본값:400
     								height: 230, // 기본값:auto
     								resizable : true, // 기본값 : false
     								modal : true, // 기본값 : true
     								}     
     * key,message, values, okCallback
     */
    mAlert: function(alertParam, okCallbackFn) {        
    	alertParam = alertParam || {};
    	var me = this;
    	var title = alertParam.title || TMsg.alert;
    	var message = alertParam.message || "";
    	// alertParam 이 String message 만 들어오는 경우 처리
    	if(UT.isNotEmpty(alertParam) && !UT.isObject(alertParam) && UT.isString(alertParam)){
    		message = alertParam;
    	}
    	message = replaceAll(message,"\n","<br>");// 줄바꿈 처리 
    	var defaultDiv = $(document.createElement('div'));
    	defaultDiv.css("display","table");
    	defaultDiv.attr("title",title);    	
    	defaultDiv.html( "<div style='display: table-cell; vertical-align: middle; padding:10px 0px 0px 0px'>" + message + "</div>");    	
    	$("body").append(divFrm);
    	var divFrm = alertParam.divFrm || defaultDiv ; 
    	var okText = alertParam.okText || TMsg.confirm;
    	var mWidth = alertParam.width || 400 ;
    	var mHeight = alertParam.height || "auto";
    	var mResizable = alertParam.resizable!=null?alertParam.resizable:false;
    	var mModal = alertParam.modal!=null?alertParam.modal:true;
    	var buttonArray = [
    		{
				text : okText ,
				click :  function (){
		    		if (UT.isFunction(alertParam.okCallback))	{alertParam.okCallback.call(me)};// OK 후처리 CallBack
		    		if (UT.isFunction(okCallbackFn))	{okCallbackFn.call(me)};// OK 후처리 CallBack
					$(this).dialog("close");
		    	}
    		}
    	];
    	if(buttonArray[0].text.length < 4) {	buttonArray[0].width = 60;}
    	divFrm.dialog({
			resizable: mResizable,
			width: mWidth,
			height: mHeight,
			modal: mModal,
			buttons: buttonArray,
			open : function(){	maskAOn();
										var closeBtn = $(".ui-dialog-titlebar-close");
										closeBtn.addClass('ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-close');
										closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-close"></span>');
									 },
			close : function(){maskAOff();},
		});
    },
    
    /**
     * ajax Call helper
     * @method ajaxCall 용 공통 메소드
     * @param Object ajaxParam 
     *  ajaxParam = {
     *  					//##필수값      						
      						url : "/system/menuManage/menuDetailAjax", //호출 URL
      						data : {"menuCd" : menuCd}, //전송 Data
      						//##선택값
      						msgType : "R" , //  S(저장)/C(등록)/R(조회)/U(수정)/D(삭제) : 메세지 출력 설정 값 , 값을 설정 하지 않는 경우 메세지 출력 안함
      						successCallbackFn : function(){....}, //처리 성공 후 Callback Function
      						errorCallbackFn : function(){....}, // 에러 후 Callback Function : 설정되지 않은 경우 기본 에러메세지 처리 기능 사용
      						beforeCallbackFn : function(){....}, //처리 전 Callback Function
      						completeCallbackFn : function(){....}, //처리 후 Callback Function
      						type : "POST",   //전송 타입
      						dataType: "json", //전송 데이터 형식
      						processData: false, //processData
      						contentType: false, //contentType
       						useConfirm: true, // 처리 여부 사용자 확인 사용여부
       						useResultMsg: false, // 저장 처리 결과 메세지 출력 여부
       						useErrorMsg : true, //에러 발생시 메세지 출력 여부
      						confirmMsg: '확인용 사용자 메세지 설정', //
      						rsltMsg: '처리 결과 사용자 메세지 설정',
      						errormsg: '오류 발생시 사용자 메세지 설정',
      						useLodingImg : true //로딩 이미지 사용여부
      						useSuccessCheck : true, //성공 Data 의 특정 값으로 성공여부 판단 여부
      						successParamName : null, //성공확인을 위한 Field Name / 기본값 null ,  : null 인 경우 data 의 값을 확인
      						successParamValue :  "SUCCESS",  // 성공시  Data 의 특정 값으로 성공여부 판단 데이터 값,  기본 값 : "SUCCESS" 
      						async : true    						
                        }
     * 
     * @example
     * var me = this;
		selectedMenuCd = menuCd;
		selectedgubun = gubun;
		var pdata = {"menuCd" : menuCd};
        UT.ajaxCall({	targetUrl : "/system/menuManage/menuDetailAjax", //호출 URL
      						paramData : pdata, //전송 Data
      						msgType : "R" , //  C(등록)/R(조회)/U(수정)/D(삭제) : 메세지 출력 설정 값 , 값을 설정 하지 않는 경우 메세지 출력 안함, C,R,U,D 외의 값을 설정하는 경우 R(조회)로 메세지 처리됨
      						//useLodingImg : (me.gubun == 'detail'?true:false),  // 로딩 이미지 사용여부
      						successCallbackFn : me.setDetailData
			             });
		......
		function setDetailData(data, status){......}
			             
     */
    ajaxCall: function( ajaxParam ){
    	ajaxParam = ajaxParam || {};
    	if(UT.isEmpty(ajaxParam.url) || UT.isEmpty(ajaxParam.data) ){
    		 alert("Target Url(url) or Parameter Data(data) is NULL!");
    		 return;
    	}
    	
    	var _async =  ajaxParam.async!=null?ajaxParam.async:true;
    	var useLodingImg =  ajaxParam.useLodingImg!=null?ajaxParam.useLodingImg:true ;
    	var send_type = "GET"; // 전송 타입
        // POST , get 원본은 post - tw 수정
    	if(UT.isNotEmpty(ajaxParam.type) && ( ajaxParam.type==="GET" || ajaxParam.type==="GET" )  ){
    		send_Type = ajaxParam.type;
    	}
    	
    	var send_dataType = "json"; // 전송 타입
    	if(UT.isNotEmpty(ajaxParam.dataType) && ( ajaxParam.dataType==="json" || ajaxParam.dataType==="text" )  ){
    		send_dataType = ajaxParam.dataType;
    	}
    	
    	var send_processData = ajaxParam.processData!=null?ajaxParam.processData:true; //
    	//input data 가 FormData인 경우 send_contentType 값을 multipart/form-data;charset=UTF-8 로 설정
    	var default_contentType = "application/x-www-form-urlencoded;charset=UTF-8";
    	if(UT.isFormData(ajaxParam.data)){
    		default_contentType = "multipart/form-data;charset=UTF-8";
    	}
    	var send_contentType =  ajaxParam.contentType!=null?ajaxParam.contentType:default_contentType;  // application/x-www-form-urlencoded, multipart/form-data, or text/plain 
    	//Success Data check  성공 여부 판단관련
    	var useSuccessCheck =  ajaxParam.useSuccessCheck!=null?ajaxParam.useSuccessCheck:false ; // 성공 Data 의 특정 값으로 성공여부 판단 여부 기본값 False
    	var successParamName = ajaxParam.successParamName || null; //성공확인을 위한 Field Name : null 인 경우 data 의 값을 확인
    	var successParamValue = ajaxParam.successParamValue || "SUCCESS";  // 성공시  Data 의 특정 값으로 성공여부 판단 데이터 값,  기본 값 : "SUCCESS"     		
    	
    	// 메세지 출력여부
    	var useSaveConfirm= ajaxParam.useConfirm!=null?ajaxParam.useConfirm:true ; // 저장 처리전 사용자 확인 여부
    	var useSelectConfirm= ajaxParam.useConfirm!=null?ajaxParam.useConfirm:false; // 조회 처리전 사용자 확인 여부
    	var useSaveResultMsg= ajaxParam.useResultMsg!=null?ajaxParam.useResultMsg:false; // 처리 결과 메세지 출력 여부
    	var useSelectResultMsg= ajaxParam.useResultMsg!=null?ajaxParam.useResultMsg:false; // 처리 결과 메세지 출력 여부
    	var useErrorMsg= ajaxParam.useErrorMsg!=null?ajaxParam.useErrorMsg:true; // 에러메세지 출력여부
    	
    	// 확인메세지
    	var saveConfirmMsg = ajaxParam.confirmMsg || TMsg.saveConfirmMsg;
    	var insertConfirmMsg = ajaxParam.confirmMsg || TMsg.insertConfirmMsg;
    	var deleteConfirmMsg = ajaxParam.confirmMsg || TMsg.deleteConfirmMsg;
    	var selectConfirmMsg = ajaxParam.confirmMsg || TMsg.selectConfirmMsg;
    	var updateConfirmMsg = ajaxParam.confirmMsg || TMsg.updateConfirmMsg;
    	var saveRsltMsg = ajaxParam.rsltMsg || TMsg.saveRsltMsg;
    	var insertRsltMsg = ajaxParam.rsltMsg || TMsg.insertRsltMsg;
    	var deleteRsltMsg = ajaxParam.rsltMsg || TMsg.deleteRsltMsg;
    	var selectRsltMsg = ajaxParam.rsltMsg || TMsg.selectRsltMsg;
    	var updateRsltMsg = ajaxParam.rsltMsg || TMsg.updateRsltMsg;
    	var errormsg = ajaxParam.errormsg ||TMsg.errormsg;
    	
    	// message setting
    	var confirmMsg = "";  
    	var rsltMsg = ""; 
    	var useConfirm = false;
    	var useRslt = false;
    	
    	var procType = null; // 처리 유형 
    	if(UT.isNotEmpty(ajaxParam.msgType) && (ajaxParam.msgType==="S" || ajaxParam.msgType==="C" || ajaxParam.msgType==="R" || ajaxParam.msgType==="U" || ajaxParam.msgType==="D")){
    		procType = ajaxParam.msgType;    		
    		if(procType === "C"){//등록
        		confirmMsg = insertConfirmMsg;rsltMsg = insertRsltMsg;useConfirm = useSaveConfirm;useRslt = useSaveResultMsg;
    		}else if(procType === "S"){//저장
        		confirmMsg = saveConfirmMsg; rsltMsg = saveRsltMsg;useConfirm = useSaveConfirm;useRslt = useSaveResultMsg;
    		}else if(procType === "U"){//수정
        		confirmMsg = updateConfirmMsg; rsltMsg = updateRsltMsg;useConfirm = useSaveConfirm;useRslt = useSaveResultMsg;
        	}else if(procType === "D"){//삭제
        		confirmMsg = deleteConfirmMsg;rsltMsg = deleteRsltMsg;useConfirm = useSaveConfirm;useRslt = useSaveResultMsg;
        	}else if(procType === "R"){//조회
        		confirmMsg = selectConfirmMsg;rsltMsg = selectRsltMsg;useConfirm = useSelectConfirm;useRslt = useSelectResultMsg;
        	}
    	}
    	
    	//Ajax 처리 함수
    	var ajaxCallfunction = function (){
    		$.ajax({
			    type: send_type, dataType: send_dataType, async : _async,
			     processData: send_processData, contentType: send_contentType,
				data: ajaxParam.data,
				url: ajaxParam.url,
				beforeSend: function() {
		    		if(useLodingImg){UT.loding("Y");} // 로딩이미지 처리    		        	
		    		if (UT.isFunction(ajaxParam.beforeCallbackFn)) ajaxParam.beforeCallbackFn.call(this);//전처리 CallBack
				},
				complete: function() {
					if(useLodingImg){UT.loding("N");useLodingImg=false;} // 로딩이미지 처리
					if (UT.isFunction(ajaxParam.completeCallbackFn)) ajaxParam.completeCallbackFn.call(this);//후처리 CallBack
				},
				success: function(data, status) {
					var isSuccess = true;
					if(useSuccessCheck){ // 작업 성공 데이터 확인 체크 여부    						
						if(UT.isNotEmpty(successParamName)){
							isSuccess = (data[successParamName]==successParamValue);    						
						}else{
							isSuccess = (data==successParamValue);
						}   						
					}
					if(useLodingImg){UT.loding("N");useLodingImg=false;}
					if(isSuccess){
						if(useRslt){ 
							UT.mAlert(rsltMsg , ajaxParam.successCallbackFn);
						}else{
							if (UT.isFunction(ajaxParam.successCallbackFn)) ajaxParam.successCallbackFn.call(this,data, status);//성공 CallBack
						}
    					
					}else{
						if(useErrorMsg){
							UT.mAlert(errormsg,ajaxParam.errorCallbackFn);
						}else{
							if (UT.isFunction(ajaxParam.errorCallbackFn)) ajaxParam.errorCallbackFn.call(this,data, status);//에러 CallBack
						}
					}
				},
				error: function(error) {
					if(useLodingImg){UT.loding("N");useLodingImg=false;}
					if(useErrorMsg){
						UT.mAlert(errormsg,ajaxParam.errorCallbackFn);
					}else{
						if (UT.isFunction(ajaxParam.errorCallbackFn)) ajaxParam.errorCallbackFn.call(this,error);//에러 CallBack
					}
					
				}
		 });
    	};
    	
    	//사용자 확인 처리
    	if(useConfirm && UT.isNotEmpty(confirmMsg)){    		
    		var confirmParam = {
    					message: confirmMsg,
    					yesCallback : ajaxCallfunction
    				};     
    		UT.mConfirm(confirmParam);
    	}else{
    		ajaxCallfunction.call(this);
    	}    	
    },
	
    loding : function(vflage){
    	if(vflage=="Y"){
    		$("#loading").css('display', 'block');
    	}else{
    		$("#loading").css('display', 'none');
    	}
    },
	
	/**
     * clone object
     *
     * @method copy
     * @param  {object} object 복사할 대상 object
     * @return {object} new object
     * @example
     *     someFunction: function(param) {
     *         var me = this;
     *         me.set("findInfo.param", UT.copy(param));
     *     }
     */
    copy: function(object) {
        if (!UT.isObject(object)) {
            return object;
        }
        if (SCUtil.isDate(object)) {
            var copy = new Date();
            copy.setTime(object.getTime());
            return copy;
        }
        if (Array.isArray(object)) {
            return object.concat();
        }
        var copy = {};
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                copy[key] = UT.copy(object[key]);
            }
        }
        return copy;
    },
	
	/**
     * uuid 만들기
     *
     * @method generateUUID
     * @return {string} uuid
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         var uuid = UT.generateUUID();
     *         ...
     *     }
     */
    generateUUID: function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0;
            var v = (c === "x") ? r : (r & 3 | 8);
            return v.toString(16);
        });
    },
	
	 /**
     * date를 format의 형태로 출력한다.
     *
     * @method  formatDate
     * @param   {date|number} date 날짜 객체 | 날짜의 time값
     * @param   {string} [format=DEF.styles.formatDate.datetimeFormat] 변환할 format
     * @return  {string} 변환된 문자열
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.formatDate(new Date(), "yyyy/MM/dd"); // 2016/04/20
     *     }
     */
    formatDate: function(date, format) {
        if (UT.isNumber(date)) {
            date = new Date(date);
        }
        if (!(SCUtil.isDate(date))) {
            return date;
        }
        var me = date;
        format = format || DEF.styles.formatDate.datetimeFormat;
        return format.replace(/(yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s)/g, function(match) {
            switch (match) {
                case "yyyy":
                    return me.getFullYear();
                case "yy":
                    var v = me.getFullYear() % 100;
                    return v > 10 ? v : "0" + v;
                case "MM":
                case "M":
                    var v = me.getMonth() + 1;
                    return match.length === 1 || v >= 10 ? v : "0" + v;
                case "dd":
                case "d":
                    var v = me.getDate();
                    return match.length === 1 || v >= 10 ? v : "0" + v;
                case "HH":
                case "H":
                    var v = me.getHours();
                    return match.length === 1 || v >= 10 ? v : "0" + v;
                case "mm":
                case "m":
                    var v = me.getMinutes();
                    return match.length === 1 || v >= 10 ? v : "0" + v;
                case "ss":
                case "s":
                    var v = me.getSeconds();
                    return match.length === 1 || v >= 10 ? v : "0" + v;
                default:
                    return match;
            }
        });
    },
	/**
     * string에 values를 replace 한다
     *
     * @method formatString
     * @param  {string}       string 대상 문자열
     * @param  {string|array} values 바꿀 문자열
     * @return {string}              replace 된 문자열
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.formatString("{0} / {1}", "a", "b");                       // a / b
     *         UT.formatString("{0} / {1}", ["a", "b"]);                     // a / b
     *         UT.formatString("{name} / {value}", {name: "a", value: "b"}); // a / b
     *     }
     */
    formatString: function(string, values) {
        values = UT.isObject(values) ? values : Array.prototype.slice.call(arguments, 1);
        return string.replace(/\{([^{}]+)\}/gm, function(matched, key) {
            return typeof values[key] === "undefined" ? matched : values[key];
        });
    },
	 /**
     * 숫자형으로.
     *
     * @method toNumber
     * @param  {string} s
     * @return {number} n : param 이 숫자형이 아니면 0
     */
    toNumber: function(s) {
        if (UT.isString(s)) {
            s = s.replace(/[\,]/g, "");
        }
        return isNaN(s) ? 0 : Number(s);
    },
	/**
     * format 형태의 string을 date 로 변환한다.
     *
     * @method toDate
     * @param  {string} str 날짜 string
     * @param  {string} [format=DEF.styles.formatDate.datetimeFormat] str의 format
     * @return {date} 변환된 date
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         UT.toDate("20160420", "yyyyMMdd"); // 2016/04/20
     *     }
     */
    toDate: function(str, format) {
        format = format || DEF.styles.formatDate.datetimeFormat;
        
        if(UT.isDate(str)){
        	return str;
        }
		if(UT.isString(str)) {
			str = str.replace(/\//g, "");
		}
        if(!UT.isString(str) || str.length !== format.length) {
            return null;
        }
        
        var y = 0, m = 0, d = 0, h = 0, mi = 0, s = 0;
        format.replace(/(yyyy|yy|MM|M|dd|d|HH|H|mm|m|ss|s)/g, function(match) {
            var offset = arguments[arguments.length - 2];
            switch (match) {
                case "yyyy":
                case "yy":
                    y = parseInt(str.substring(offset, offset + match.length), 10);
                    break;
                case "MM":
                case "M":
                    m = parseInt(str.substring(offset, offset + match.length), 10) - 1;
                    break;
                case "dd":
                case "d":
                    d = parseInt(str.substring(offset, offset + match.length), 10);
                    break;
                case "HH":
                case "H":
                    h = parseInt(str.substring(offset, offset + match.length), 10);
                    break;
                case "mm":
                case "m":
                    mi = parseInt(str.substring(offset, offset + match.length), 10);
                    break;
                case "ss":
                case "s":
                    s = parseInt(str.substring(offset, offset + match.length), 10);
                    break;
                default:
                    break;
            }
        });
        return new Date(y, m, d, h, mi, s);
    },
	
	 /**
     * Array 여부
     *
     * @method isArray
     * @param  {object}  object
     * @return {boolean} true is array
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (UT.isArray(dataRows)) {
     *             ...
     *         }
     *     }
     */
    isArray: function(object) {
        return Array.isArray(object);
        // return Object.prototype.toString.call(object) === "[object Array]";
    },

    /**
     * String 여부
     *
     * @method isString
     * @param  {object}  object
     * @return {boolean} true is string
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (UT.isString(usrId)) {
     *             ...
     *         }
     *     }
     */
    isString: function(object) {
        return "string" === typeof object;
    },

    /**
     * Boolean 여부
     *
     * @method isBoolean
     * @param  {object}  object
     * @return {boolean} true is boolean
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         me.set("singleSelect", UT.isBoolean(options.singleSelect) ? options.singleSelect : false);
     *     }
     */
    isBoolean: function(object) {
        return "boolean" === typeof object;
    },

    /**
     * Number 여부
     *
     * @method isNumber
     * @param  {object}  object
     * @return {boolean} true is number
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (UT.isNumber(count)) {
     *             ...
     *         }
     *     }
     */
    isNumber: function(object) {
        return "number" === typeof object;
    },

    /**
     * Function 여부
     *
     * @method isFunction
     * @param  {object}  object
     * @return {boolean} true is function
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         if (UT.isFunction(callback)) {
     *             callback.call(this);
     *         }
     *     }
     */
    isFunction: function(object) {
        return "function" === typeof object;
    },

    /**
     * Object 여부
     * <br>
     * (주의: null 도 object이지만, 편의상 null 은 object에서 제외 한다)
     *
     * @method isObject
     * @param  {object}  object
     * @return {boolean} true is object
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (UT.isObject(options.defaultParam)) {
     *             me.set("findList.param", options.defaultParam);
     *         }
     *     }
     */
    isObject: function(object) {
        return object !== null && "object" === typeof object;
    },
    
    
    isFormData: function(object) {
        return UT.isObject(object) && object.toString() == "[object FormData]" ;
    },

    /**
     * Date 여부
     *
     * @method isDate
     * @param  {object}  object
     * @return {boolean} true is date
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (UT.isDate(param)) {
     *             
     *         }
     *     }
     */
    isDate: function(object) {
        return UT.isObject(object) && typeof object.getTime === "function";
    },

    /**
     * 데이터의 empty 여부
     * <br>
     * string일 경우 trim 후 empty 검사한다
     *
     * @method isEmpty
     * @param  {string|array} object
     * @return {boolean}      true is empty
     * @example
     *     someFunction: function() {
     *         var me = this;
     *         ...
     *         if (!UT.isEmpty(item)) {
     *             ...
     *         }
     *     }
     */
    isEmpty: function(object) {
        return object === null || "undefined" === typeof object 
        			|| (UT.isObject(object) && !Object.keys(object).length && !UT.isDate(object) && !UT.isFormData(object)) 
        			|| (UT.isString(object) && object.trim() === "") 
        			|| (UT.isString(object) && object.trim() === "")
        			|| (UT.isArray(object) && object.length === 0);
    },

    /**
     * !UT.isEmpty(object)
     *
     * @method isNotEmpty
     * @param  {string|array} object
     * @return {boolean}      true is not empty
     */
    isNotEmpty: function(object) {
        return !UT.isEmpty(object);
    },

    /**
     * input element에서 enter key가 눌렸을 때의 이벤트
     *
     * @method enter
     * @param {object} element
     * @param {function} callback enter key가 눌린 후 콜백 함수
     * @example
     *     someFunction: function() {
     *         var me = this;
     *     }
     */
    enter: function(element, callback) {
        $(element).find("input").keypress(function(key) {
            if (key.keyCode === 13) {
                if (UT.isFunction(callback)) {
                    callback.call(this);
                }
            }
        });
    },

	/**
     * 숫자인 경우 문자열로 변환
     *
     * @private
     * @method toString
     * @param  {object} v
     * @return {string}
     */
    toString: function(v) {
        if (UT.isNumber(v)) {
            return v.toString();
        }
        return v;
    },	

	isEmail : function(v) {
		var regExp = new RegExp("^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$", "i");
		if(!regExp.test(v)){
			return false;
		}
		return true;
	},
	
	isMobile : function(v) {
		var regExp = new RegExp("/^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/");
		if(!regExp.test(v)){
			return false;
		}
		return true;
	},
	
	isPhone : function(v) {
		var regExp =  new RegExp("/^\d{2,3}-\d{3,4}-\d{4}$/");
		if(!regExp.test(v)){
			return false;
		}
		return true;
	},
	
	isAlphabet : function(v) {
		var regExp = new RegExp("/[^A-Za-z]/");
		if(!regExp.test(v)){
			return false;
		}
		return true;
	},
	isUrl : function(v) {
		var regExp = new RegExp("/[^A-Za-z0-9]/");
		var value = v ? v.replace(/[\.\,\-\+]/g, "") : ""; // . , - + 제거하고 비교
		if(!regExp.test(value)){
			return false;
		}
		return true;
	},
	isNospace : function(v) {
		var regExp = new RegExp("/[\s\t\r\n\v\f]/");
		if(!regExp.test(value)){
			return false;
		}
		return true;
	}	
};


