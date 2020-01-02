import {AREA_OFF, AREA_ON, AREA_TOGGLE, AreaAction} from "../actions";

export interface IArea {
    [index: number]: string
}

const initialState: IArea = [];

export function areaReducer(state: IArea = initialState, action: AreaAction): IArea {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    let index: number, newState: Array<string>;
    switch (action.type) {
        case AREA_TOGGLE:
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.payload);

            if (index === -1) {
                newState.push(action.payload)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case AREA_ON:
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.payload);

            if (index === -1) {
                newState.push(action.payload)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case AREA_OFF:
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.payload);

            if (index !== -1) {
                newState.splice(index, 1);
            }
            return newState;
        default:
            return state;
    }
}
