import { useRef, useContext } from "react";
import { AppContext } from "context/App.context";
import { CITY_CHANGED } from "utils/constants";
import styles from "./Header.module.scss";

const Header = () => {
	const inputRef = useRef('');
	const { state, dispatch} = useContext(AppContext);

	const updateCity = (event) => {
		event.preventDefault();
		if (state.location !== inputRef.current.value) {
			dispatch({
				type: CITY_CHANGED,
				payload: {
					location: inputRef.current.value,
				},
			});
		}
	};

	return (
		<div className={styles.header}>
			<header>
				<h1>5-Day Weather Forecast</h1>
			</header>
			<section>
				<form onSubmit={updateCity}>
					<input
						type="text"
						className={styles.header__input}
						ref={inputRef}
						placeholder={state.location}
					/>
					<button type="submit" className={styles.header__btn}>
						Search
					</button>
				</form>
			</section>
			{ state.status === 'failed' && <span className={styles.header__error}>Please enter valid city name!</span> }
		</div>
	);
}

export default Header;