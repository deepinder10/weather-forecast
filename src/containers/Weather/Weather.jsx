import { useEffect, useContext } from "react";
import Layout from "components/Layout/Layout";
import { AppContext } from "context/App.context";
import useLocation from "hooks/useLocation";
import { fetchData } from "utils/api";
import styles from './Weather.module.scss';

const Weather = () => {
	const { state, dispatch } = useContext(AppContext);
	const position = useLocation(dispatch);

	// when user types a location
	useEffect(() => {
		if (state.location) {
			fetchData(state.location, dispatch);
		}
	}, [state.location, dispatch]);

	// when geolocation fetches a location
	useEffect(() => {
		if (position) {
			fetchData(position, dispatch);
		}
	}, [position, dispatch]);

	
	return <div className={styles.weather}>
		<Layout />
	</div>;
}

export default Weather;