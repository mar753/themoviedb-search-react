import React, { Component } from 'react';

const pagination = {
  marginBottom: '50px'
}

const paddingLr = {
  paddingLeft: '5px',
  paddingRight: '5px'
}

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      paginationPage: 1
    });
  }

  render() {
    const page = this.props.page ? this.props.page : 0;
    const pagesArray = this.props.pages ?
      [...Array(this.props.pages + 1).keys()].slice(1) : [];
    return (
      <section className="text-center">
        {
          (!!page && !!pagesArray.length) && pagesArray.map(item =>
            <span className={pagination} key={item}>
            {
              item !== this.state.paginationPage ?
                <a className='pointer-hover' style={paddingLr}
                  onClick={() => this.handleLinkClick(item)}>{item}
                </a> :
                <span className={'font-bold'} style={paddingLr}>{item}</span>
            }
            </span>
          )
        }
      </section>
    );
  }

  handleLinkClick(page) {
    this.setState({paginationPage: page});
    this.props.setPage({page: page});
  }
}

export default Pagination;
