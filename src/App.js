import React, { Component } from 'react';
import './App.css';

const list = [
  {
    id: 1,
    title: "Gonk, the Raptor",
    cost: 7,
    atk: 4,
    htl: 9,
    text: "After your hero attacks and kills a minion, it may attack again."
  },
  {
    id: 2,
    title: "Captain Hooktusk",
    cost: 8,
    atk: 6,
    htl: 3,
    text: "Battlecry: Summon 3 Pirates from your deck. Give them Rush.",
  },
];
const isSearched = searchTerm => card => card.title.toLowerCase().includes(searchTerm.toLowerCase());
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list,
      searchTerm: '',
    };
  }
  
  onDismiss = (id) =>{
    const isNotId = card => card.id !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({list: updatedList});
  }
  onSearchChange = (event) =>{
    this.setState({searchTerm: event.target.value});
  }
  
  render() {
    const {searchTerm, list} = this.state;
    return (
      <div className="App">
      <Search
        value={searchTerm}
        onChange={this.onSearchChange}
      />
      <Table
        list={list}
        pattern={searchTerm}
        onDismiss={this.onDismiss}
      />
     </div>
    );
  }
}
class Search extends Component{
  render(){
    const{value, onChange} = this.props;
    return(
      <form>
        <input
        type="text"
        value={value}
        onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component{
  render(){
    const{list, pattern, onDismiss} = this.props
    return(
      <div>
        {list.filter(isSearched(pattern)).map(card =>
        <div class="CardDisp" key={card.id} >
          <div>{card.title}</div>
          <div>{card.atk} {card.htl}</div>
          <div>{card.text}</div>
          <div>
            <button
            onClick={()=> onDismiss(card.id)}
            type="button"
            >
              Dismiss
            </button>
            <div style={{height: 30}}></div>
          </div>
        </div>
          )}
      </div>
    );
  }
}
export default App;
