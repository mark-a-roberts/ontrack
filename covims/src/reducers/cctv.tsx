import {CCTV} from "../data/cctv";
import {cctvList} from './mock/cctv.mock';

const initialState: Array<CCTV> = cctvList();

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
                item => item.id !== action.payload.id
            );
        default:
            return state;
    }
}
