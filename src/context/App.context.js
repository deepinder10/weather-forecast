import { useReducer, createContext } from "react";
import {
	CITY_CHANGED,
	FETCH_DATA_FULFILLED,
	FETCH_DATA_REJECTED,
	SET_LOADING,
} from "utils/constants";

const initialState = { location: "", forecast: [], status: "success", loading: false };

const AppContext = createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
		case CITY_CHANGED:
			return {
				...state,
				...action.payload,
			};
		case FETCH_DATA_FULFILLED: {
			return {
				...state,
				...action.payload,
				status: "success",
			};
		}
		case FETCH_DATA_REJECTED: {
			return {
				...state,
				status: "failed",
			};
		}

		default:
			return state;
	}
};

function AppProvider(props) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{ state, dispatch }}>{props.children}</AppContext.Provider>
	);
}
export { AppContext, AppProvider };
