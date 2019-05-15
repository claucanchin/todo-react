class List extends React.Component {
    render() {
        console.log("list propssss:",this.props.data);

        let list = this.props.data.map((todo, index) => {
            return <li key={ index }>{ todo }</li>
        });
        return (
            <ol>
                {list}
            </ol>
        );
    }
}


class App extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
  }

  state = {
    list : [],
    word : ""
  }

  changeHandler(event){
    this.setState({word:event.target.value});
    // console.log("change", event.target.value);
  }

  clickHandler(event){
    let inputText = this.state.word;
    this.state.list.push(inputText);
    this.setState({
        list : this.state.list,
        word : ""
    })
  }

  render() {
      // render the list with a map() here
      // return this.state.list.map((todo, index) => {

      // })

      console.log("rendering");
      return (
        <div className="list">
          <input onChange={ this.changeHandler } value={this.state.word}/>
          <button onClick={ this.clickHandler }>add item</button>
            <List data = { this.state.list } />
        </div>
      );
  }
}

ReactDOM.render(
    <App

    />,
    document.getElementById('root')
);