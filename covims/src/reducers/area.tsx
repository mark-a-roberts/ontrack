import {Area} from "../data/area";
import {AREA_UPDATE, AREA_TOGGLE, initialAreas, AreaToggle, AreaUpdate} from "../actions";

const initialState: Area[] = initialAreas;

export function areaReducer(state: Area[] = initialState, action: AreaUpdate | AreaToggle): Area[] {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    let newState: Area[];
    switch (action.type) {
        case AREA_UPDATE:
            newState = state.map( (a) => a.key === action.payload.key ? action.payload: a);
            return newState;
        case AREA_TOGGLE:
            newState = state.map( (a) => (a.key === action.payload ? {...a, value: !a.value }: a));
            return newState;
        default:
            return state;
    }
}
