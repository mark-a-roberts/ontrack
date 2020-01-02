import {MAP_UPDATE, MapAction} from "../actions";

export interface MapState {
    center: { lat: number, lng: number };
    zoom: number
}

const initialState: MapState = {
    center: {lat: 51.5, lng: -0.25},
    zoom: 10
};

export function mapReducer(state: MapState = initialState, action: MapAction): MapState {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    let newState: MapState;
    switch (action.type) {
        case MAP_UPDATE:
            // @ts-ignore
            newState = {...state, ...action.payload};
            return newState;
        default:
            return state;
    }
}
