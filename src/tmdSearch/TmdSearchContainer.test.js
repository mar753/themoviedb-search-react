import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TmdSearchContainer from './TmdSearchContainer';
import TmdSearch from './TmdSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TmdSearchContainer />, div);
});

it('should contain presentational component', () => {
  const wrapper = shallow(
    <TmdSearchContainer />
  );
  expect(wrapper.contains(<TmdSearch />)).toBeTruthy();
});
