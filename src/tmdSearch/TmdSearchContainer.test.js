import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import TmdSearchContainer from './TmdSearchContainer';
import TmdSearch from './TmdSearch';
import Pagination from './pagination/Pagination';
import config from './config.json';

const xhrMock = {
  open : jest.fn(),
  send : jest.fn(),
  readyState: 4,
  status: 200,
  responseText: JSON.stringify([
    { title: 'Matrix' },
    { rate: '7' }
  ]),
  statusText: 'Error'
};
const realXMLHttpRequest = window.XMLHttpRequest;
const fakeXMLHttpRequest = jest.fn(() => xhrMock);
const realConsoleError = console.error;
const fakeConsoleError = jest.fn();

function resetXhrMock() {
  fakeXMLHttpRequest.mockClear();
  xhrMock.open.mockClear();
  xhrMock.send.mockClear();
  xhrMock.readyState = 4;
  xhrMock.status = 200;
  xhrMock.responseText = JSON.stringify([{title: 'Matrix'}, {rate: '7'}]);
  xhrMock.statusText = 'Error';
}

beforeEach(() => {
  window.XMLHttpRequest = fakeXMLHttpRequest;
  console.error = fakeConsoleError;
});

afterEach(() => {
  resetXhrMock();
  window.XMLHttpRequest = realXMLHttpRequest;
  console.error = realConsoleError;
});


function checkStateExpectatations(wrapper, searchParam, adultParam) {
  expect(wrapper.instance().state.searchParam).toEqual(searchParam);
  expect(wrapper.instance().state.adultParam).toEqual(adultParam);
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TmdSearchContainer />, div);
});

it('should contain presentational component', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  expect(wrapper.find('TmdSearch').exists()).toBeTruthy();
});

it('should contain paging component when pages > 1', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  wrapper.instance().setState({results: {page: 1, total_pages: 2}});
  expect(wrapper.find('Pagination').exists()).toBeTruthy();
});

it('should retrieve data without errors', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  expect(wrapper.instance().state.results).toBeNull();
  wrapper.instance().getResults({searchValue: 'value 1'});
  expect(xhrMock.open).toBeCalledWith('GET', config['api-url'] +
    '?api_key=' + config['api-key'] + '&query=value%201', true);
  expect(xhrMock.send).toBeCalled();
  xhrMock.onload();
  expect(wrapper.instance().state.results.toString())
    .toBe([{ title: 'Matrix' },{ rate: '7' }].toString());
});

it('should remember the data when called twice', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  expect(wrapper.instance().state.searchParam).toEqual('');
  expect(wrapper.instance().state.adultParam).toEqual('');
  wrapper.instance().getResults({searchValue: 'value', adultValue: true});
  checkStateExpectatations(wrapper, '&query=value', '&include_adult=true');
  xhrMock.onload();
  wrapper.instance().getResults({});
  checkStateExpectatations(wrapper, '&query=value', '&include_adult=true');
  xhrMock.onload();
  expect(xhrMock.open).toBeCalledWith('GET', config['api-url'] +
    '?api_key=' + config['api-key'] + '&query=value&include_adult=true', true);
  expect(xhrMock.open).toHaveBeenCalledTimes(2);
  expect(xhrMock.send).toBeCalled();
  expect(xhrMock.send).toHaveBeenCalledTimes(2);
  expect(wrapper.instance().state.results.toString())
    .toBe([{ title: 'Matrix' }, { rate: '7' }].toString());
});

it('should return error when HTTP status is not 200', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  xhrMock.status = 500;
  expect(wrapper.instance().state.results).toBeNull();
  wrapper.instance().getResults({searchValue: 'value'});
  expect(xhrMock.open).toBeCalledWith('GET', config['api-url'] +
    '?api_key=' + config['api-key'] + '&query=value', true);
  expect(xhrMock.send).toBeCalled();
  xhrMock.onload();
  expect(fakeConsoleError).toBeCalledWith('Error');
});

it('should return error when onerror was invoked', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  expect(wrapper.instance().state.results).toBeNull();
  wrapper.instance().getResults({searchValue: 'value'});
  expect(xhrMock.open).toBeCalledWith('GET', config['api-url'] +
    '?api_key=' + config['api-key'] + '&query=value', true);
  expect(xhrMock.send).toBeCalled();
  xhrMock.onerror();
  expect(fakeConsoleError).toBeCalledWith('Error');
});

it('should return error when return data cannot be parsed to JSON', () => {
  const wrapper = shallow(
    <TmdSearchContainer results="" getResults="" />
  );
  xhrMock.responseText = '<>';
  expect(wrapper.instance().state.results).toBeNull();
  wrapper.instance().getResults({searchValue: 'value'});
  expect(xhrMock.open).toBeCalledWith('GET', config['api-url'] +
    '?api_key=' + config['api-key'] + '&query=value', true);
  expect(xhrMock.send).toBeCalled();
  xhrMock.onload();
  expect(fakeConsoleError).toBeCalledWith(
    'SyntaxError: Unexpected token < in JSON at position 0');
});
