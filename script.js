// ****************************************************
// ********************** APP *************************
// ****************************************************

class App extends React.Component {
    constructor() {
        super()
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    state = {
        list: [],
        word: "",
        deleted: []
    }

    removeHandler(event) {
        // console.log(event.target.value)
        let index = event.target.value
        let newList = this.state.list
        let newDeletedList = this.state.deleted
        // console.log('deleted item',newList[index])
        //add deleted item to delete list
        newDeletedList.push(newList[index])
        console.log('deleted stuff:', newDeletedList)

        //remove item from to-do list
        newList.splice(index, 1)
        this.setState({
            list: newList,
            deleted: newDeletedList
        });
    }

    changeHandler(event) {
        this.setState({ word: event.target.value });
        // console.log("change", event.target.value);
    }

    submitHandler(event) {
        let newWord = this.state.word;
        let newList = this.state.list;

        if (newWord.length > 1) {
            newList.push({
                text: newWord,
                timestamp: Date.now()
            });
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
                <h4>Current to-do: {this.state.list.length}</h4>
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
                        <List
                        data={this.state.list}
                        removeHandler={(e) => {this.removeHandler(e)}}
                        />
                    </tbody>
                </table>
                <h1>Deleted Tasks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Task</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <DeleteList
                        trash={this.state.deleted}
                        />
                    </tbody>
                </table>
            </div>
        );
    }
}

// ****************************************************
// ********************* LIST *************************
// ****************************************************

class List extends React.Component {
    constructor() {
        super()
    }

    render() {
        // console.log("list propssss:",this.props.data);
        let tasks = this.props.data.map((todo, index) => {

            return  <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{todo.text}</td>
                        <td>{moment(todo.timestamp).format('D MMMM YYYY, h:mm:ss a')}</td>
                        <td><button value={index} onClick={this.props.removeHandler}>Remove</button></td>
                    </tr>
        });

        return (
            <React.Fragment>
                {tasks}
            </React.Fragment>
        );
    }
}

// ****************************************************
// ******************* DELETED ************************
// ****************************************************

class DeleteList extends React.Component {
    render() {
        let deletedItems = this.props.trash.map((item, index) => {

            return  <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.text}</td>
                        <td>{moment(item.timestamp).format('D MMMM YYYY, h:mm:ss a')}</td>
                    </tr>
        });
        return (
            <React.Fragment>
                {deletedItems}
            </React.Fragment>
        );
    }
}

// ****************************************************
// ****************************************************
// ****************************************************

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);