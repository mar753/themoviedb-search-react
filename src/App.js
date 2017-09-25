import React, { Component } from 'react';
import Header from './common/Header';
import TmdSearchContainer from './tmdSearch/TmdSearchContainer';

/**
 * Main application
 *
 * @class
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: "The Movie Database Search"}
  }

  render() {
    return (
      <div>
        <Header title={this.state.title}></Header>
        <TmdSearchContainer />
      </div>
    );
  }
}

export default App;
