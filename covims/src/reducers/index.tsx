import { combineReducers } from "redux";
import { alertReducer } from "./alerts";
import { filterReducer} from "./filter";

const rootReducer = combineReducers({
    alerts: alertReducer,
    filter: filterReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
