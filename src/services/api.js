import Constants from './constants';
let getData = (city) => {
	return fetch(Constants.API_BASE + city + Constants.APP_ID + Constants.API_KEY)
			.then(response => response.json())
}

let API = {getData};

export default API;