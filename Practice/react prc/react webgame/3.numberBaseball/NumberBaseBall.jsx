const React = require('react')
const {Component} = React;

class NumberBaseBall extends Component{


    state = {
        word:'문자열'
    };

    render(){
        return (
            <>
                <h1>테스트{this.state.word}</h1>
            </>
        )
    }
}


module.exports = NumberBaseBall;