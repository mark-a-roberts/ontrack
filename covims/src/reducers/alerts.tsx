type AlertType = 'broken' | 'hazard' | 'collision' | 'closure' | 'lights' | 'traffic';

export interface IAlert {
    id: string;
    type: AlertType;
    area: string;
    title: string;
    text: string;
    time: Date;
    lat?: number;
    lng?:number;
    completed: boolean;
}

const alertTypes: AlertType[] = [
    'broken' , 'hazard' , 'collision' , 'closure' , 'lights' , 'traffic'
];

function testDate(start = new Date( 2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const mockAlert = () : IAlert => {
    const type:AlertType = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    let position = {
        lat: 51.25 + Math.random()*0.5,
        lng: -0.70 + Math.random(),
    };

    let area = (position.lat < 51.5) ? 'south' :
        ((position.lng > 0.10) ? 'east'  : ((position.lng < -0.10) ? 'west' : 'central'));
    return  {
        id: '' + Math.floor(Math.random() * 1000000),
        type,
        area,
        title: type,
        text: 'some text',
        time: testDate(),
        ...position,
        completed: Math.random() > 0.5 ? true : false
    }
};

const initialState: Array<IAlert> = Array.from( { length:1000}, () => mockAlert());

class ActionType {
    id!: string;
    type!: string;
    payload!: IAlert;
    completed!: boolean;
}

export function alertReducer(state = initialState, action: ActionType): Array<IAlert> {
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
                    alert => alert.id !== action.payload.id
            );
        default:
            return state;
    }
}

export const filteredAlerts = (alerts: IAlert[], filters: string[], areas: string[]) => {
    let sorted = alerts.slice().sort((a: any, b: any) => (b.time - a.time));
    return filters.length ?
        sorted.filter((a: IAlert) => (filters.indexOf(a.type) >= 0)) :
        sorted;
};
