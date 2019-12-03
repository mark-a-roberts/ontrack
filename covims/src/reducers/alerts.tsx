type AlertType = 'broken' | 'hazard' | 'collision' | 'closure' | 'lights' | 'traffic';

export interface IAlert {
    key: string;
    type: AlertType;
    title: string;
    text: string;
    time: Date;
    completed: boolean;
}

function randomDate(start = new Date( 2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const initialState: Array<IAlert> =
    [
        {key: '1', type: 'hazard', title: 'Hazard', text: 'A1: hazard', time:  randomDate(), completed: false},
        {key: '2', type: 'collision', title: 'Collision', text: 'A34: collision', time:  randomDate(), completed: false},
        {key: '3', type: 'hazard', title: 'Hazard', text: 'A406: hazard', time: randomDate(), completed: false},
        {key: '4', type: 'closure', title: 'Closure', text: 'A307: closure', time:  randomDate(), completed: false},
        {key: '5', type: 'lights', title: 'Traffic Light', text: 'A3205: traffic light failure', time:  randomDate(), completed: false},
        {key: '6', type: 'traffic', title: 'Traffic Slow', text: 'A3205: traffic jam', time:  randomDate(), completed: false},
        {key: '7', type: 'broken', title: 'Broken Buss', text: 'A214: bus broken down', time:  randomDate(), completed: false},
    ]
;

class ActionType {
    id!: string;
    type!: string;
    payload!: {
        type: AlertType,
        title: string;
        text: string;
        time:  Date;
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
                    type: action.payload.type,
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
