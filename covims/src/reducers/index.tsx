import { combineReducers } from "redux";
import { alertReducer } from "./alerts";
import { filterReducer} from "./filter";
import { areaReducer } from "./area";

const rootReducer = combineReducers({
    alerts: alertReducer,
    filter: filterReducer,
    area: areaReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
