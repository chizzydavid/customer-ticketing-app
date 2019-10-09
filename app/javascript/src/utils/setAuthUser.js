import axios from 'axios';

export default (token) => {
  if (token) {
    localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		delete axios.defaults.headers.common['Authorization']
	}
}
