window.date_utils = {
    months: ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"],
    days: Array.from({ length: 31 }, (v, k) => k + 1),
    years: Array.from({ length: 30 }, (v, k) => k + 2018)
};

date_utils.parseDate = function(day, month, year){
    var month = date_utils.months.indexOf(month) + 1;
    var year = year.substring(2);
    var date = `${day}.${month}.${year}`;
    return date;
}

window.Activity = {};

var isWinter = function(month){
    var month = date_utils.months.indexOf(month);
    return month >= 0 && month < 3 || month === 11;
}

Activity.getActivityMessage = function(month){
    return isWinter(month) ? "if it is not too cold" : "";
}


class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className='container'>
                    <SideBar />
                    <Content />
                </div>
            </div>
       )};

}

class Header extends React.Component {
    render(){
        return(
            <div className='header'>

            </div>

        )};
   
}

class SideBar extends React.Component {
    render(){
        return(
            <div className='sideBar'>

            </div>
            
            )};
   
}

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var new_activity = {
            name: this.name.value,
            day: this.day.value,
            month: this.month.value,
            year: this.year.value
        };
        this.state.activities.push(new_activity);
        this.setState({ activities: this.state.activities });
    }

    renderOptions(arr){
        return arr.map(x => <option key={x} value={x}>{x}</option>);
    }

    render() {
        return (
            <div className='content'>
                <form onSubmit={this.handleSubmit}>
                    <input id='inputActivity'ref={input => this.name = input} placeholder="my new activity"></input>
                    <span className='select-items'>
                    <select ref={x => this.day = x}>
                        {this.renderOptions(date_utils.days)}
                    </select>
                    <select ref={x => this.month = x}>
                        {this.renderOptions(date_utils.months)}
                    </select>
                    <select ref={x => this.year = x}>
                        {this.renderOptions(date_utils.years)}
                    </select>
                    </span>
                    <input type="submit" value="add"></input>
                </form>
                <List activities={this.state.activities} />
            </div>
        );
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    

    generateActivityString(activity) {
        var date = date_utils.parseDate(activity.day, activity.month, activity.year);
        var new_activity = `${activity.name} on ${date} ${Activity.getActivityMessage(activity.month)}`;
        return new_activity;
    }

    render() {
        return (
            <ul>

                {this.props.activities.map((activity, i) => <div className='divList' key={i}><input type='checkbox'>{this.generateActivityString(activity)}</input></div>)}
            </ul>
        );
    }
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
);