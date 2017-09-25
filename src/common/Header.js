import React, { Component } from 'react';

const headerStyle = {
  backgroundColor: 'black',
  borderBottom: 'solid 1px black',
  borderTop: 'solid 1px black',
  color: '#efefef'
};

class Header extends Component {
  render() {
    return (
      <section className="text-center" style={headerStyle}>
        <h1>{this.props.title}</h1>
      </section>
    );
  }
}

export default Header;
