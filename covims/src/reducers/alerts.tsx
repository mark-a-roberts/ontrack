export interface IAlert {
    key: string;
    type: string;
    title: string;
    text: string;
    time: string;
    completed: boolean;
}


const initialState: Array<IAlert> =
    [
        {key: '1', type: 'hazard', title: 'Hazard', text: 'A1: hazard', time: '', completed: false},
        {key: '2', type: 'collision', title: 'Collision', text: 'A34: collision', time: '', completed: false}
    ]
;

class ActionType {
    id!: string;
    type!: string;
    payload!: {
        title: string;
        text: string;
        time: string;
    };
    completed!: boolean;
}

export function alertReducer(state = initialState, action: ActionType): Array<IAlert> {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    key: action.id,
                    type: action.type,
                    title: action.payload.title,
                    text: action.payload.text,
                    time: action.payload.time,
                    completed: action.completed
                }];
        case 'DELETE':
            return state.filter(
                    alert => alert.key !== action.id
            );
        default:
            return state;
    }
}
