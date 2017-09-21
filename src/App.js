import React, { Component } from 'react';
import Header from './common/Header';

class App extends Component {
  constructor(){
    super();
    this.state = {title: "The Movie Database Search"}
  }

  render() {
    return (
      <div>
        <Header title={this.state.title}></Header>
      </div>
    );
  }
}

export default App;
