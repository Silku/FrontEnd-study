import { useEffect, useRef } from "react";

export function useOndraw(onDraw){
    const canvasRef = useRef(null);

    const isDrawingRef = useRef(false);

    const mouseMoveListnerRef = useRef(null);
    const mouseDownListnerRef = useRef(null);
    const mouseUpListnerRef = useRef(null);

    const prevPointRef = useRef(null);



    // useEffect(()=>{
    //     return () =>{
    //         if(mouseMoveListnerRef.current){
    //             window.removeEventListener("mousemove", mouseMoveListnerRef.current);
    //         }
    //         if(mouseUpListnerRef.current){
    //             window.removeEventListener("mouseup", mouseUpListnerRef.current);
    //         }
    //     }
    // },[])

    function setCanvasRef(ref){ 
        if(!ref) return;
        // if(canvasRef.current){
        //     canvasRef.current.removeEventListner("mousedown", mouseDownListnerRef.current);  
        // }
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    // 마우스 무빙 감지
    function initMouseMoveListener(){
        const mouseMoveListner = (e) =>{
            // console.log({x : e.clientX, y: e.clientY})
            if(isDrawingRef.current){
                const point = pointInCanvas(e.clientX, e.clientY);
                const ctx = canvasRef.current.getContext('2d');
                if(onDraw){
                    onDraw(ctx,point, prevPointRef.current);
                    prevPointRef.current = point;
                };
                // console.log(point)
            }

        }
        mouseMoveListnerRef.current = mouseMoveListner;
        window.addEventListener("mousemove", mouseMoveListner)
    }

    function initMouseDownListener(){
        if(!canvasRef.current) return;
        const listner =()=>{
            // console.log("마우스 눌름")
            isDrawingRef.current = true;
        }
        mouseDownListnerRef.current = listner;
        canvasRef.current.addEventListener("mousedown", listner)
    }
    
    function initMouseUpListener(){
        const listner = ()=>{
            isDrawingRef.current =false;
            prevPointRef.current = null;
            // console.log("마우스 손뗌")
            //@todo : 손 뗄떼 리스트에 추가
        }
        mouseUpListnerRef.current = listner;
        canvasRef.current.addEventListener("mouseup", listner);
    }
 
    // 캔버스 안에 포인터가 위치할때
    function pointInCanvas(clientX, clientY){
        if(canvasRef.current){
            const boundingRect = canvasRef.current.getBoundingClientRect();
            return {
                x: parseInt(clientX - boundingRect.left),
                y: parseInt(clientY - boundingRect.top)
            }
        }else{
            return null;
        }
        /*@studyMemo :  
        Element.getBoundingClientRect() 메서드는 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환합니다.
        */
    }


    return setCanvasRef;
}