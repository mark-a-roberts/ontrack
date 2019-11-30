export interface Filter {
    [index:number] : string
}

const initialState: Filter = [];

class ActionType {
    type!: string;
    value!: string;
}

export function filterReducer( state:Filter = initialState, action: ActionType): Filter {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    let index: number, newState: Array<string>;
    switch (action.type) {
        case 'TOGGLE':
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.value);

            if (index === -1) {
                newState.push( action.value)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case 'ON':
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.value);

            if (index === -1) {
                newState.push( action.value)
            } else {
                newState.splice(index, 1);
            }
            return newState;
        case 'OFF':
            // @ts-ignore
            newState = [...state];
            index = newState.indexOf(action.value);

            if (index !== -1) {
                newState.splice(index, 1);
            }
            return newState;
        default:
            return state;
    }
}
