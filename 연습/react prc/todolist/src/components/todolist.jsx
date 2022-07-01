import React, {Component} from "react";

class TodoList extends Component{
    render(){
        return(
        <>
        <p>
            <span className="todo">Study</span>
            <span className="todo-count">1</span>
            <button className="todo-button todo-increase">+</button>
            <button className="todo-button todo-decrease">-</button>
            <button className="todo-button todo-delete">DELETE!</button>
        </p>
        </>
        )
    }
}

export default TodoList;