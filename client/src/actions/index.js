// Axios is react library for making ajax/api calls to server

import axios from 'axios';
import { FETCH_USER } from './types';

// fetchUser is the action creator here for fetching user data

export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

// action creator for handling Token
export const handleToken = token => async dispatch => {
	const res = await axios.post('/api/stripe', token);
	dispatch({ type: FETCH_USER, payload: res.data });
};
