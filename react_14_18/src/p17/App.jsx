import React,{ Component } from "react";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {count:0};
        console.log("Constructor called");
    }

    componentDidMount(){
        console.log("component mounded");
    }

    componentDidUpdate(preProps, preState){
        console.log(`component updated : previous Value = ${preState.count}, new State value = ${this.state.count}`);
    }

    componentWillUnmount(){
        console.log("component will unmount");
    }


    render(){
        return (
            <>
                <h1>{this.state.count}</h1>
                <button onClick={()=>this.setState({ count: this.state.count + 1 })}>+</button>
                 <button onClick={()=>this.setState({ count: this.state.count - 1 })}>-</button>
            </>
        )
    }
}

export default App;