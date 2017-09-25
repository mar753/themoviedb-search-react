import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pagination page={1} pages={2} />, div);
});

it('should render without crashing when no page parameter', () => {
  const wrapper = shallow(
    <Pagination pages={2} />
  );
  expect(wrapper.contains(<section className="text-center"></section>)).toBeTruthy();
});

it('should render without crashing when no pages parameter', () => {
  const wrapper = shallow(
    <Pagination page={1} />
  );
  expect(wrapper.contains(<section className="text-center"></section>)).toBeTruthy();
});

it('should render component properly', () => {
  const wrapper = shallow(
    <Pagination page={1} pages={2} />
  );
  expect(wrapper.findWhere(n => n.name() === 'span' && n.text() === '1' &&
    n.prop('className') === 'font-bold').exists()).toBeTruthy();
  expect(wrapper.findWhere(n => n.name() === 'a' && n.text() === '2').exists())
    .toBeTruthy();
});

it('should change page from first to second on link click', () => {
  const callbackMock = jest.fn();
  const wrapper = shallow(
    <Pagination page={1} pages={2} setPage={callbackMock} />
  );
  expect(wrapper.findWhere(n => n.name() === 'span' && n.text() === '1' &&
    n.prop('className') === 'font-bold').exists()).toBeTruthy();
  expect(wrapper.findWhere(n => n.name() === 'a' && n.text() === '2').exists())
    .toBeTruthy();
  wrapper.findWhere(n => n.name() === 'a' && n.text() === '2').simulate(
    'click');
  expect(wrapper.findWhere(n => n.name() === 'span' && n.text() === '2' &&
    n.prop('className') === 'font-bold').exists()).toBeTruthy();
  expect(wrapper.findWhere(n => n.name() === 'a' && n.text() === '1').exists())
    .toBeTruthy();
  expect(callbackMock).toBeCalledWith({'page': 2});
});
