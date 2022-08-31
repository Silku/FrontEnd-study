import React, { useState , useRef} from "react";
import styles from "./canvas.module.css"
import { useOndraw } from "./canvasHook";
// import zoom-pan-pitch

        /*@todo
            마우스클릭감지
            포인터 인식
            그려내기
            리스트에 추가
            삭제하기
            캔버스 확대축소
        */

    const Canvas = ({
        width,
        height
    }) => {

        const [zoom, setZoom] = useState(0)

        const zoomCanvasRef = useRef(null)

        //@@ canvasDraw 관련
        const setCanvasRef = useOndraw(onDraw);
 
        function onDraw(ctx, point, prevPoint){
            drawLine(prevPoint, point, ctx, '#000', 1.5)
        }
 
        function drawLine(
            start,
            end,
            ctx,
            color,
            width
        ){
            start = start ?? end;
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.strokeStyle = color;
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            // ctx.fillStyle = '#000'
            // ctx.beginPath();
            // // x축,y축, 반지름, 시작각도, 끝각도
            // ctx.arc(point.x, point.y, 1, 0, 2*Math.PI);   
            // ctx.fill()
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(start.x, start.y, 0.2, 0, 2*Math.PI);
            ctx.fill();

        }

        
        //@@ zoom 관련
        const zoomIn = () => {
            setZoom(zoom+1);
            // console.log(zoom)
            const zoomValue = zoom/4;
            console.log(zoomValue)
            // jsCanvas.style.scale=(1.25,1.25)
            // console.log("확대")
        }

        const zoomOut = () => {
            if(zoom<0) return;
            setZoom(zoom-1);
            const zoomValue = (zoom/4);
            console.log(zoomValue)
            // jsCanvas.style.scale=(1,1)
        }


        
        return(
            <div className={styles.canvasContainer}>
                <div className={styles.deleteBtn}>                    
                    <label><input type="checkbox"/> Delete Mode</label>
                </div>
                    <canvas className={styles.canvas}
                        width="1000px"
                        height="600px"
                        ref={setCanvasRef}
                    >
                    </canvas>
                <div className={`${styles.buttomBtnCont}`}>
                        <button onClick={zoomIn}>+</button>
                        <button onClick={zoomOut}>-</button>
                </div>
            </div>
        )
    }


export default Canvas;
