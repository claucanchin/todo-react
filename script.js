class List extends React.Component {
    constructor() {
        super()
        this.removeHandler = this.removeHandler.bind(this);
    }

    removeHandler(event) {
        // console.log(event.target.value)
        let index = event.target.value
        // let item = this.props.data[index]
        // console.log(item)
        this.props.data.splice(index, 1)
        this.setState({list: this.props.data})
    }

    render() {
        // console.log("list propssss:",this.props.data);

        let tasks = this.props.data.map((todo, index) => {
            return (
                <li key={ index + todo }>
                    { todo }
                    <button value={index} onClick={this.removeHandler}>Delete</button>
                </li>
                )
        });
        return (
            <ol>
                {tasks}
            </ol>
        );
    }
}


class App extends React.Component {
    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    state = {
        list: [],
        word: ""
    }

    changeHandler(event) {
        this.setState({ word: event.target.value });
        // console.log("change", event.target.value);
    }

    clickHandler(event) {
        let newWord = this.state.word;
        let newList = this.state.list;
        if (newWord.length > 1) {
            newList.push(newWord);
            this.setState({
                list: newList,
                word: ""
            })
        } else {
            alert("Error: 'Task' must be more than 1 character!");
            this.setState({ word: "" })
        }
    }

    render() {

        // console.log("rendering");
        return (
            <div>
                <h1>To-Do List</h1>
                <input onChange={ this.changeHandler } value={this.state.word} placeholder="order pizza"/>
                <button onClick={ this.clickHandler }>add task</button>

                <List data = { this.state.list } />
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);