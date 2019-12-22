import { combineReducers } from "redux";
import { alertReducer } from "./alerts";
import { filterReducer} from "./filter";
import { areaReducer } from "./area";
import { mapReducer } from "./map";

const rootReducer = combineReducers({
    alerts: alertReducer,
    filter: filterReducer,
    areas: areaReducer,
    map: mapReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
