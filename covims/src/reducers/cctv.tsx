import {CCTV} from "../data/cctv";
import {mockCCTV} from './cctv.mock';

const initialState: Array<CCTV> = Array.from({length: 1000}, () => mockCCTV());

class ActionType {
    id!: string;
    type!: string;
    payload!: CCTV;
}

export function cctvReducer(state = initialState, action: ActionType): Array<CCTV> {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    ...action.payload
                }];
        case 'DELETE':
            return state.filter(
                incident => incident.id !== action.payload.id
            );
        default:
            return state;
    }
}
