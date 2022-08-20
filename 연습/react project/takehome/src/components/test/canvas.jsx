import React, {Component, useState} from "react";

        // 마우스클릭감지
        // 포인터 인식
        // 그려내기
        // 리스트에 추가
        // 삭제하기
        // 캔버스 확대축소

        class Test extends Component{
        mousehandler(){
            const [mouseEvent, setMouseEvent] = useState();

            console.log('캔버스에 마우스 올라옴')
        }


        render(){
            return(
                <div className="canvas" onMouseOver={this.mousehandler} onMouseOut={this.mousehandler}>
                    <button>DELETE</button>
                    캔버스
                    <button>+</button>
                    <button>-</button>
                </div>
            )
        }
    }

export default Test;
