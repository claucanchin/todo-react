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
                <h1>to.do.app</h1>
                <input onChange={ this.changeHandler } value={this.state.word} placeholder="order pizza"/>
                <button onClick={ this.submitHandler }>+ Task</button>
                <h2>To-Do List</h2>
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
                <h2>Deleted Tasks</h2>
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
    render() {
        // console.log("list propssss:",this.props.data);
        let tasks = this.props.data.map((todo, index) => {

            return  <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{todo.text}</td>
                        <td>{moment(todo.timestamp).format('D MMMM YYYY, h:mm:ss a')}</td>
                        <td>
                            <button value={index} onClick={this.props.removeHandler}>Remove</button>
                            <button value={index} onClick={this.props.editHandler}>Edit</button>
                        </td>
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
// ****************** DELETE LIST *********************
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
// ******************** EDIT LIST *********************
// ****************************************************

class EditHandler extends React.Component {
    render() {
        return (
            <div>
                <h1></h1>
            </div>
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