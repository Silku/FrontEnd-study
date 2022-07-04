import React, {Component} from "react";

class TodoAddform extends Component{

    formRef = React.createRef();
    inputRef = React.createRef();
    

    //submit 이벤트가 발생했을때 데이터가 지워지지 않게 하기 위함
    //실제 db가 아닌 객체 받아와서 배열로 처리했기떄문
    onSubmit = event => {
        event.preventDefault();
        //value, vaule 오타 조심합시다... 오류도 안뜨네 이건;;
        const name = this.inputRef.current.value; 
        name && this.props.onAdd(name);
        //폼전달되면 reset이 되도록
        this.formRef.current.reset();
    }

    render(){
        return(
            <form ref={this.formRef} className="add-form" onSubmit={this.onSubmit}>
                <input ref={this.inputRef} type="text" className="add-input" placeholder="할 일을 적어주세요"/>
                <button className="add-button">확인</button>
            </form>
        );
    }
}

export default TodoAddform;
