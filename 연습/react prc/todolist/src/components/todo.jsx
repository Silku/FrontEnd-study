import React, {Component} from "react";

class Todo extends Component{
    state = {
        count : 0, 
    };
    //state 값 바꿀때는 함수형식으로만 바꿀수있음
    handleIncrement = () =>{
        this.setState({count: this.state.count + 1})
    }
    handleDecrement = () =>{
        const minusCount = this.state.count -1;
        //minusCount값이 0보다 작으면 0 그렇지않으면 계속 감소
        this.setState({count: minusCount < 0 ? 0 : minusCount})
    }

    render(){
        return(
        <>
        <p>
            <span className="todo">Study</span>
            <span className="todo-count">{this.state.count}</span>
            <button className="todo-button todo-increase" onClick={this.handleIncrement}>
                <i className="fas fa-plus-square"></i>
            </button>
            <button className="todo-button todo-decrease" onClick={this.handleDecrement}>
            <i className="fas fa-minus-square"></i>
            </button>
            <button className="todo-button todo-delete">
                <i className="fas fa-trash"></i>
            </button>
        </p>
        </>
        )
    }
}

export default Todo;