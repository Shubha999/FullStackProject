import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

//index.js is the root file for react app always

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//ReactDOM takes 2 arguments, 1st one is root component and 2nd one is where we are attempting to render that component inside our DOM
//Root component is essentially our App component
//Redux store is created below as the top level of our application and hooked it up to the React side of our application by placing Provider tag
//Provider tag here is a react component that knows how to reach changes from our Redux store anytime Redux store gets updated and has a nexw state
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root'),
);

console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY);
console.log('ENV IS', process.env.NODE_ENV);
