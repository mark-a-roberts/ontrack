import {combineReducers} from "redux";
import {alertReducer} from "./alerts";
import {filterReducer} from "./filter";
import {areaReducer} from "./area";
import {mapReducer} from "./map";
import {incidentReducer} from "./incident";
import {cctvReducer} from "./cctv";

const rootReducer = combineReducers({
    alerts: alertReducer,
    filter: filterReducer,
    areas: areaReducer,
    map: mapReducer,
    incidents: incidentReducer,
    cctv: cctvReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
