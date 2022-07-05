import React, {PureComponent} from "react";

class Todo extends PureComponent{
    state = {
        count : 0, 
    };
    //state 값 바꿀때는 함수형식으로만 바꿀수있음
    handleIncrement = () =>{
        this.props.onIncrement(this.props.todo)
    }
    handleDecrement = () =>{
        this.props.onDecrement(this.props.todo)
    }
    handleDelete = () =>{
        this.props.onDelete(this.props.todo)
    }

    render(){

        const {name, count} = this.props.todo
        console.log(`todo: ${name} 🔴`);

        return(
        <li className="todo">
            <span className="todo-name">{name}</span>
            <span className="todo-count">{count}</span>
            <button className="todo-button todo-increase" onClick={this.handleIncrement}>
                <i className="fas fa-plus-square"></i>
            </button>
            <button className="todo-button todo-decrease" onClick={this.handleDecrement}>
            <i className="fas fa-minus-square"></i>
            </button>
            <button className="todo-button todo-delete" onClick={this.handleDelete}>
                <i className="fas fa-trash"></i>
            </button>
        </li>
        )
    }
}

export default Todo;