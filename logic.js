class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <List />
            </div>
        )
    };

}

class Header extends React.Component {
    render() {
        return (
            <h1 className='header'>My ToDo List <img className='logoImage' src='https://image.flaticon.com/icons/svg/590/590510.svg' /></h1>
        )
    };

}


class List extends React.Component {
    constructor() {
        super()
        this.newList = this.newList.bind(this),
            this.doneList = this.doneList.bind(this),
            this.trash = this.trash.bind(this),
            this.showDone = this.showDone.bind(this),
            this.state = {
                arr: [],
                done: [],
                key: 0,
                check: false,
                display: 'none'
            }
    }


    newList(e) {
        if (e.charCode == 13) {
            this.setState({
                key: this.state.key + 1
            })
            this.state.arr.push(<div className="divList" key={this.state.key}> <img onClick={this.doneList} src="https://image.flaticon.com/icons/svg/2/2276.svg" />{this.textInput.value} </div>)
        }
    }

    doneList(e) {
        this.setState({
            key: this.state.key + 1
        })
        var task = e.target.parentElement.textContent;
        e.target.parentElement.remove();
        var task_arr = this.state.arr;
        for (var i = 0; i < task_arr.length; i++) {
            if (task === task_arr[i].props.children[2]) {
                task_arr.splice(i, 1);
            }
        }
        var done_arr = this.state.done;
        done_arr.push(<div className="divList press" key={this.state.key + 1}> <img onClick={this.passToDo} onChange={this.changeClassName} id="unchecked" src="https://image.flaticon.com/icons/svg/25/25643.svg" />{task}  <img className="trashLogo" onClick={this.trash} src="https://image.flaticon.com/icons/svg/126/126468.svg" /> {this.task}</div>)

        this.setState({
            arr: task_arr,
            done: done_arr
        })
    }

    trash(e) {
        e.target.parentElement.remove();
    }

    showDone() {
        var newDisplay = this.state.display == 'none' ? 'block' : 'none'
        this.setState({
            display: newDisplay
        })
    }

    render() {

        return (

            <div className="container">
                <input ref={(text) => { this.textInput = text; }} onKeyPress={this.newList} id='inputActivity' type="text" placeholder="Add a new activity" />
                <span >{this.state.arr} </span>

                <div><button className="doneButton" onClick={this.showDone} ><h3>Done</h3></button></div>
                <div style={{ display: this.state.display }} >
                    {this.state.done}

                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);