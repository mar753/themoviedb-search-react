import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import TmdSearch from './TmdSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TmdSearch />, div);
});

it('should contain a form with an input and a checkbox', () => {
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

it('should not invoke a callback when the form was not submitted', () => {
  const getResultsMock = jest.fn();
  const wrapper = render(
    <TmdSearch results="" getResults={getResultsMock} />
  );
  expect(getResultsMock.mock.calls.length).toBe(0);
});

it('should invoke a callback when the form was submitted', () => {
  const getResultsMock = jest.fn();
  const wrapper = shallow(
    <TmdSearch getResults={getResultsMock} />
  );
  wrapper.findWhere(n => n.name() === 'input' && n.prop('type') === 'checkbox')
    .simulate('change',
      {target: {type: 'checkbox', checked: true, name: 'adultValue'}});
  wrapper.findWhere(n => n.name() === 'input' && n.prop('type') === 'text')
    .simulate('change',
      {target: {type: 'text', value: 'ab', name: 'searchValue'}});
  wrapper.find('form').simulate('submit', {preventDefault: jest.fn()});
  expect(getResultsMock.mock.calls.length).toBe(1);
  expect(getResultsMock.mock.calls[0][0].adultValue).toBeTruthy();
  expect(getResultsMock.mock.calls[0][0].searchValue).toBe('ab');
  expect(wrapper.instance().props['getResults']).toBe(getResultsMock);
});
