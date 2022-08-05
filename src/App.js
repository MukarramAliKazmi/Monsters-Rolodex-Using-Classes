import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

// https://jsonplaceholder.typicode.com/users
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState(
        () => {
          return { monsters: users };
        },
        () => {
          console.log(this.state);
        }
      ));
  }

  render() {

    const filteredMonsters = this.state.monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(this.state.searchField)
    })


    return (
      <div className="App">
        <input className="search-box" type="search" placeholder="search monsters"
          onChange={
            (event) => {
              console.log(event.target.value)
              const searchField = event.target.value.toLocaleLowerCase()

              this.setState(() => {
                console.log(this.state.monsters)
                return { searchField }
              })
            }
          }
        />

        {filteredMonsters.map((monster) => {
          return <div key={monster.id}><h1>{monster.name}</h1></div>
        })}
      </div >
    );
  }
}

export default App;
