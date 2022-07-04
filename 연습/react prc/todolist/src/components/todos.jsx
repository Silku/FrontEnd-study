import React, {Component} from "react";
import Todo from "./todo";


class Todos extends Component{

    render(){
        return(
            <div className="todos">
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
            </div>
        )
    }
}

export default Todos;