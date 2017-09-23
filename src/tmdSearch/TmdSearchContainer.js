import React, { Component } from 'react';
import TmdSearch from './TmdSearch';
import Pagination from './pagination/Pagination';
import config from './config.json';

/**
 * Container component which handles API communication via XMLHttpRequest
 *
 * @class
 */
class TmdSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      searchParam: '',
      adultParam: ''};
  }

  render() {
    const enablePaging = !!this.state.results && !!this.state.results.page
      && this.state.results.total_pages > 1;
    return (
      <section>
        <TmdSearch
          results={this.state.results}
          getResults={this.getResults.bind(this)} />
        {
          enablePaging &&
            <Pagination page={this.state.results.page}
            pages={this.state.results.total_pages}
            setPage={this.getResults.bind(this)} />
        }
      </section>
    );
  }

  /**
   * Function to be executed as callback from child component, sends GET request
   *
   * @param {Object} data - has values from text input, checkbox and page number
   */
  getResults(data) {
    this.setState({searchParam: data.searchValue ?
      '&query=' + data.searchValue : this.state.searchParam});
    this.setState({adultParam: data.adultValue ?
      '&include_adult=' + data.adultValue : this.state.adultParam});
    this.sendAjaxRequest(config['api-url'] + this.addGetParams(data));
  }

  addGetParams(data) {
    let params = 'api_key=' + config['api-key'];
    params += data.searchValue ?
      '&query=' + data.searchValue.replace(/ /g, '%20') : this.state.searchParam;
    params += data.adultValue ?
      '&include_adult=' + data.adultValue : this.state.adultParam;
    params += data.page ? '&page=' + data.page : '';
    params = params.length ? '?' + params : '';
    return params;
  }

  sendAjaxRequest(url) {
    let xhr = new XMLHttpRequest();
    this.handleOnload(xhr);
    xhr.onerror = function() {
      console.error(xhr.statusText)
    };
    xhr.open("GET", url, true);
    xhr.send();
  }

  handleOnload(xhr) {
    xhr.onload = () => {
      if(xhr.status === 200) {
        this.verifyIfJsonResponse(xhr.responseText);
      } else {
        console.error(xhr.statusText);
      }
    };
  }

  verifyIfJsonResponse(response) {
    try {
      let results = JSON.parse(response);
      this.setState({results: results});
    } catch(e) {
        console.error(e.toString());
    }
  }
}

export default TmdSearchContainer;
