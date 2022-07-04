import React, {Component} from "react";
import Todo from "./todo";
import TodoAddform from "./todoAddform";

class Todos extends Component{

    render(){
        console.log('render-todos')
        return(
            <div className="todos">
                <TodoAddform onAdd={this.props.onAdd}/>
                <ul>
                    { 
                        this.props.todos.map(todo => (
                            <Todo key={todo.id} todo={todo} 
                            onIncrement={this.props.onIncrement}
                            onDecrement={this.props.onDecrement}
                            onDelete={this.props.onDelete}
                            />
                        ))
                    }
                </ul>
                <button className="todos-reset" onClick={this.props.onReset}>
                    초기화
                </button>
            </div>
        )
    }
}

export default Todos;