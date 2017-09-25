import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchItem from './SearchItem';

const movie = {
  'id':769, 'vote_average':8.2, 'title':'GoodFellas', 'poster_path':'/g.jpg',
  'adult':false, 'overview':'Lorem ipsum', 'release_date':'1990-09-12'
};

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing
  elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel
  lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam.
  Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum,
  dui ligula ultricies purus, sed posuere libero dui id orci.`;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchItem movie={movie}/>, div);
});

it('should render title', () => {
  const wrapper = shallow(
    <SearchItem movie={movie}/>
  );
  expect(wrapper.findWhere(n => n.name() === 'h2' &&
    n.text().includes('GoodFellas')).exists()).toBeTruthy();
});

it('should render all elements', () => {
  const wrapper = shallow(
    <SearchItem movie={movie}/>
  );
  expect(wrapper.findWhere(n => n.name() === 'img' &&
    n.prop('alt') === 'Poster' && n.prop('src').includes('/g.jpg')).exists())
      .toBeTruthy();
  expect(wrapper.findWhere(n => n.name() === 'h2' &&
    n.text().includes('(1990)')).exists()).toBeTruthy();
  expect(wrapper.contains(<h4>Rate 8.2/10</h4>)).toBeTruthy();
  expect(wrapper.contains(<h5>Lorem ipsum</h5>)).toBeTruthy();
});

it('should not render all elements', () => {
  const titleOnly = {title: 'Matrix'};
  const wrapper = shallow(
    <SearchItem movie={titleOnly}/>
  );
  expect(wrapper.findWhere(n => n.name() === 'img' &&
    n.prop('alt') === 'Poster').exists()).toBeFalsy();
  expect(wrapper.contains(<div className="col-sm-4 col-md-3">
    <h2 className="font-bold">Matrix</h2></div>)).toBeTruthy();
});

it('should cut description when > 300', () => {
    const longDescription = {title: 'Matrix', overview: description}
    const wrapper = shallow(
    <SearchItem movie={longDescription}/>
  );
  expect(wrapper.findWhere(n => n.name() === 'img' &&
    n.prop('alt') === 'Poster').exists()).toBeFalsy();
  expect(wrapper.contains(<h2 className="font-bold">Matrix</h2>)).toBeTruthy();
  expect(wrapper.findWhere(n => n.name() === 'h5' && n.text().length === 303 &&
    n.text().includes('...')).exists()).toBeTruthy();
});
