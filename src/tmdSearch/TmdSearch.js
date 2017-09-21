import React, { Component } from 'react';

const containerStyle = {
  paddingTop: '2em'
};

class TmdSearch extends Component {
  render() {
    return (
      <div className="container padding" style={containerStyle}>
        <form>
          <div className="row">
            <div className="col-md-5 col-md-offset-3">
              <input className="form-control" type="text" placeholder="Enter movie title" required />
              <div className="checkbox">
                <label><input type="checkbox" />Display adult movies</label>
              </div>
            </div>
            <div className="col-md-1 text-center">
              <button className="btn btn-primary" type="submit">Search</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TmdSearch;
