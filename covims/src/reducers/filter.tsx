import { FILTER_OFF, FILTER_ON, FILTER_TOGGLE, FilterActionTypes} from "../actions";

export interface Filter {
    [index:number] : string
}

const initialState: Filter = [];

export function filterReducer( state:Filter = initialState, action: FilterActionTypes): Filter {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    let index: number, newState: Array<string>;
    switch (action.type) {
        case FILTER_TOGGLE:
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.payload);

            if (index === -1) {
                newState.push( action.payload)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case FILTER_ON:
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.payload);

            if (index === -1) {
                newState.push( action.payload)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case FILTER_OFF:
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
