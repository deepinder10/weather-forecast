import { useContext } from "react";
import { AppContext } from "context/App.context";
import TileDetail from "components/TileDetail/TileDetail";
import styles from "./ForecastTiles.module.scss";

const ForecastTiles = () => {
	const { state } = useContext(AppContext);
	const groupByDays = (data) => {
		return data.reduce((list, item) => {
			const forecastDate = item.dt_txt.substr(0, 10);
			list[forecastDate] = list[forecastDate] || [];
			item.date = forecastDate;
			list[forecastDate].push(item);

			return list;
		}, {});
	};

	// Returns week of the day
	const getDayInfo = (data) => {
		const daysOfWeek = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		return daysOfWeek[new Date(data[0].date).getDay()];
	};

	// Fetches the icon using the icon code available in the forecast data.
	const getIcon = (data) =>
		`https://openweathermap.org/img/w/${data[0].weather[0].icon}.png`;

	// Gets the Minimum, Maximum and Avg Humidity temperatures of the day.
	const getInfo = (data, min = [], max = [], humidity = []) => {
		data.forEach((item) => {
			max.push(item.main.temp_max);
			min.push(item.main.temp_min);
			humidity.push(item.main.humidity);
		});

		const minMax = {
			min: Math.round(Math.min(...min)),
			max: Math.round(Math.max(...max)),
		};

		// Gets the day's average humdity
		const avgHumdity = Math.round(
			humidity.reduce((curr, next) => curr + next) / humidity.length
		);

		return (
			<div className={styles.tiles__weather}>
				<div className={styles.tiles__weather__text}>
					<strong>{`${minMax.max}°C`}</strong> / {`${minMax.min}°C`}
				</div>
				<div
					className={styles["tiles__weather__more-text"]}
				>{`Avg. Humidity: ${avgHumdity}%`}</div>
			</div>
		);
	};

	// Toggles accordion to display hourly weather information
	const showMoreInfo = (index) => {
		const el = document.querySelector(
			`.more${index}`
		);
		if (el) {
			if (el.classList.contains(styles.expanded)) {
				el.classList.remove(styles.expanded);
			} else {
				el.classList.add(styles.expanded);
			}
		}
	};

	const forecasts= state.forecast;
	const tiles = Object.values(groupByDays(forecasts));

	// this ensures that we are showing only 5-days of forecast.
	const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

	return (
		<div className={styles.tiles}>
			{forecastTiles.map((item, i) => (
				<div
					className={styles.tiles__tile}
					key={i}
					onClick={() => showMoreInfo(i)}
				>
					<div className={styles.tiles__info}>
						<div className={styles.tiles__icon}>
							<img src={getIcon(item)} alt="weather-icon" />
							{getDayInfo(item)}
						</div>
						{getInfo(item)}
					</div>
					<div className={`${styles.tiles__detailed} more${i}`}>
						<TileDetail data={item} />
					</div>
				</div>
			))}
		</div>
	);
};

export default ForecastTiles;
