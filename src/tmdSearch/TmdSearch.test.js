import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TmdSearch from './TmdSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TmdSearch />, div);
});

it('should contain form with input and checkbox', () => {
  const wrapper = shallow(
    <TmdSearch />
  );
  const form = wrapper.find('form');
  expect(form.exists()).toBeTruthy();
  expect(form.findWhere(
    n => n.name() === 'input' && n.prop('type') === 'text').exists()).toBeTruthy();
  expect(form.findWhere(
    n => n.name() === 'input' && n.prop('type') === 'checkbox').exists()).toBeTruthy();
  const button = form.findWhere(
    n => n.name() === 'button' && n.prop('type') === 'submit');
  expect(button.exists()).toBeTruthy();
  expect(button.text()).toEqual('Search');
});
