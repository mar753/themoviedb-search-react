import React, { Component } from 'react';
import SearchItem from './searchItem/SearchItem';

const containerStyle = {
  paddingTop: '2em'
};

/**
 * Presentational component for the 'The Movie Database' API
 *
 * @class
 */
class TmdSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      adultValue: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'text' ? target.value : target.checked;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.getResults(this.state);
  }

  render() {
    const textInput = this.renderTextInput();
    const checkbox = this.renderCheckbox();
    return (
      <div className="container padding" style={containerStyle}>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-md-5 col-md-offset-3">
              { textInput }
              { checkbox }
            </div>
            <div className="col-md-1 text-center">
              <button className="btn btn-primary" type="submit">Search</button>
            </div>
          </div>
        </form>
        {
          !!this.props.results &&
            this.props.results.results.map(m => <SearchItem key={m.id} movie={m} />)
        }
      </div>
    );
  }

  renderTextInput() {
    return (
      <input
        className="form-control"
        type="text"
        name="searchValue"
        value={this.state.searchValue}
        onChange={this.handleInputChange}
        placeholder="Enter movie title"
        required />
    );
  }

  renderCheckbox() {
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            name="adultValue"
            checked={this.state.adultValue}
            onChange={this.handleInputChange} />
          Display adult movies
        </label>
      </div>
    );
  }
}

export default TmdSearch;
