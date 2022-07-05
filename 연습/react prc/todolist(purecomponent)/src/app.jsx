import React, {Component}from 'react';
import './app.css';
import NavBar from './components/navbar.jsx';
import Todos from './components/todos';

class App extends Component{

    state = {
        todos: [
            {id: 1, name:'study', count:0},
            {id: 2, name:'breath', count:0},
            {id: 3, name:'stand', count:0},
        ]
    };

    handleIncrement = todo =>{
        const todos = this.state.todos.map(item =>{
            if(item.id === todo.id){
                //pureComponent 쓸경우, 객체가 바뀌지 않으면 렌더링이 되지 않으니깐 todo를 복사해 가져와서 count값을 1더해서 전달
                return {...todo, count: todo.count +1};
            }
            return item
        })
        this.setState({todos})
    }

    handleDecrement = todo =>{
        const todos = this.state.todos.map(item =>{
            if(item.id === todo.id){
                const count = todo.count-1
                return {...todo, count: count < 0 ? 0 :count};
            }
            return item
        })
        this.setState({todos})
    }

    handleDelete = todo =>{
        const todos = this.state.todos.filter(item => item.id !== todo.id)
        this.setState({todos});
    }

    handleAdd = name => {
        const todos = [...this.state.todos, {id:Date.now(), name, count:0}];
        this.setState({todos})  // -> this.setState({todos, todos}) 와 같음
        console.log('동작됨')
    };
    handleReset = () =>{
        const todos = this.state.todos.map(todo =>{
            todo.count = 0;
            return todo;
        })
        this.setState({todos})
    };
 
    render(){
        return(
            <>
                <NavBar totalCount={this.state.todos.filter(item => item.count > 0).length}/>
                <Todos
                    todos={this.state.todos} 
                    onIncrement={this.handleIncrement}
                    onDecrement={this.handleDecrement}
                    onDelete={this.handleDelete}
                    onAdd={this.handleAdd}
                    onReset={this.handleReset}
                />
            </>
        )
    }

}



export default App;
