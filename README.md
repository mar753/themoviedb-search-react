# The Movie Database API search UI
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/mar753/themoviedb-search-react/master/LICENSE)

This is a user interface for The Movie Database search API written using React library. Check out exactly the same project written using Angular framework: https://github.com/mar753/themoviedb-search-angular

## About the project

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). JavaScript ES6 is supported. It uses React library version ^15.6.1 with Bootstrap ^3.3.7. Jest with enzyme were used to write unit tests. Usable functions are documented using JSDoc. Application (src/) was divided into several components (besides automatically created - App):
- common/Header.js - component which displays header
- common/Header.test.js - unit tests for the Header.js
- tmdSearch/config.json - API configuration file (enter your API key here)
- tmdSearch/TmdSearchContainer.js - container component which handles API requests using plain XMLHttpRequest
- tmdSearch/TmdSearchContainer.test.js - Unit tests for the TmdSearchContainer.js
- tmdSearch/TmdSearch.js - presentational component which handles form and search results displaying
- tmdSearch/TmdSearch.test.js - Unit tests for the TmdSearch.js
- tmdSearch/pagination/Pagination.js - component to handle pagination
- tmdSearch/pagination/Pagination.test.js - Unit tests for the Pagination.js
- tmdSearch/searchItem/SearchItem.js - component presenting one search item of a result
- tmdSearch/searchItem/SearchItem.test.js - Unit tests for the SearchItem.js

## Installation

After cloning this repo, run `npm install` in the project folder. Then you need to generate your own API key to access https://api.themoviedb.org/3. This key should be pasted in the '%project%/src/tmdSearch/config.json' file, instead of 'key'. Basic `npm` commands:
- `npm start` to serve the app, then navigate to `http://localhost:3000` in the browser
- `npm test` to run unit tests with Jest

More detailed description is below.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Help

More information about create-react-app you can find here:
https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md
