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

            return  <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{todo.text}</td>
                        <td>{moment(todo.timestamp).format('D MMMM YYYY, h:mm:ss a')}</td>
                        <td><button value={index} onClick={this.removeHandler}>Delete</button></td>
                    </tr>
        });
        return (
            <React.Fragment>
                {tasks}
            </React.Fragment>
        );
    }
}


class App extends React.Component {
    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    state = {
        list: [],
        word: ""
    }

    changeHandler(event) {
        this.setState({ word: event.target.value });
        // console.log("change", event.target.value);
    }

    submitHandler(event) {
        let newWord = this.state.word;
        let newList = this.state.list;

        if (newWord.length > 1) {
            newList.push({text: newWord, timestamp: Date.now()});
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
                <button onClick={ this.submitHandler }>add task</button>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Task</th>
                            <th>Created</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <List data = { this.state.list } />
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);