import React, {PureComponent} from "react";

class NavBar extends PureComponent{
    render(){
        console.log('navbar :-D ')
        return(
        <div className="navbar">
            <i className="fa-solid fa-leaf navbar-logo"></i>
            <span>오늘의 할일 목록</span>
            <span className="navbar-count">{this.props.totalCount}</span>
        </div>
        )   
    }
}



export default NavBar;