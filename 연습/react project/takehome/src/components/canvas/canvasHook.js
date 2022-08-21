import { useRef } from "react";

export function useOndraw(onDraw){
    const canvasRef = useRef(null);

    function setCanvasRef(ref){ 
        if(!ref) return;
        canvasRef.current = ref;
        initMouseMoveListener();
    }

    // 마우스 무빙 감지
    function initMouseMoveListener(){
        const mouseMoveListner = (e) =>{
            // console.log({x : e.clientX, y: e.clientY})
            const point = pointInCanvas(e.clientX, e.clientY);
            const ctx = canvasRef.current.getContext('2d');
            if(onDraw){
                onDraw(ctx,point)
            };
            console.log(point)
        }
        window.addEventListener("mousemove", mouseMoveListner)
    }

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
        //studyMemo :  Element.getBoundingClientRect() 메서드는 엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환합니다.
    }


    return setCanvasRef;
}