import axios from "axios";
import { APP_ID, FETCH_DATA_FULFILLED, FETCH_DATA_REJECTED, SET_LOADING } from "utils/constants";

export const fetchData = (region, dispatch) => {
	const { latitude, longitude } = region || {};

	const getDataByCity = `https://api.openweathermap.org/data/2.5/forecast?q=${region}&units=metric&appid=${APP_ID}`;
	const getDataByCoords = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${APP_ID}`;

	let location = typeof region === "object" ? getDataByCoords : getDataByCity;
	// set loader to true
	dispatch({ type: SET_LOADING, payload: { loading: true } });
	// request API
	return axios
		.get(location)
		.then((response) => {
			dispatch({
				type: FETCH_DATA_FULFILLED,
				payload: {
					forecast: response.data.list,
					location: response.data.city.name.toLowerCase(),
				},
			});
			dispatch({ type: SET_LOADING, payload: { loading: false } });
		})
		.catch((err) => {
			dispatch({ type: SET_LOADING, payload: { loading: false } });
			dispatch({ type: FETCH_DATA_REJECTED, payload: err }); // Error handling
		});
};;
