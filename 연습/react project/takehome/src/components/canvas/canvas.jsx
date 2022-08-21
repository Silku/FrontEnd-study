import React from "react";
import { useOndraw } from "./canvasHook";

        // 마우스클릭감지
        // 포인터 인식
        // 그려내기
        // 리스트에 추가
        // 삭제하기
        // 캔버스 확대축소
    const Canvas = ({
        width,
        height
    }) => {

        const setCanvasRef = useOndraw(onDraw);
 
        function onDraw(ctx, point){
            ctx.fillStyle = '#000'
            ctx.beginPath();
            // x,y, 반지름, 시작각도, 끝각도
            ctx.arc(point.x, point.y, 2, 0, 2*Math.PI);   
            ctx.fill()
        }
 
        return(
            <canvas className="canvas" 
                width={width}
                height={height}
                ref={setCanvasRef}
            >
                {/* <button>DELETE</button>
                캔버스
                <button>+</button>
                <button>-</button> */}
            </canvas>
        )
    }


export default Canvas;
