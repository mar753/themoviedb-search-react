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

it('should contain 2x SearchItem - mocked response provided', () => {
  const results = { 'results': [
    {'id':769, 'vote_average':8.2, 'title':'GoodFellas', 'poster_path':'/g.jpg',
      'adult':false, 'overview':'Lorem ipsum', 'release_date':'1990-09-12'},
    {'id':550, 'vote_average':8.3, 'title':'Fight Club', 'poster_path':'/f.jpg',
      'adult':false, 'overview':'Lorem ipsum', 'release_date':'1999-10-15'}]};
  const wrapper = shallow(
    <TmdSearch results={results} getResults="" />
  );
  expect(wrapper.find('SearchItem').length).toBe(2);
  expect(wrapper.instance().props.results).toBeTruthy();
  expect(wrapper.instance().props.results.results[0].title).toBe('GoodFellas');
  expect(wrapper.instance().props.results.results[1].title).toBe('Fight Club');
});
