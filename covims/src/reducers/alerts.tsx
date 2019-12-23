
export interface IAlert {
    id: string;
    type: string;
    area: string;
    title: string;
    text: string;
    time: Date;
    lat?: number;
    lng?:number;
    completed: boolean;
}

type AlertType = {
    [key: string]: {
        name: string;
    }
};

export const alertTypes: AlertType = {
    broken: {
        name: 'Breakdown'
    },
    hazard: {
        name: 'Hazard'
    },
    collision: {
        name: 'Collision'
    },
    closure: {
        name: 'Road Closure'
    },
    lights: {
        name: 'Faulty Signal'
    },
    traffic: {
        name: 'Traffic'
    }
};

const alertKeys = Object.keys(alertTypes);

function testDate(start = new Date( 2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomAlert = () => {
    return alertKeys[ alertKeys.length * Math.random() << 0];
};

const mockAlert = () : IAlert => {
    const type = randomAlert();
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
        title: alertTypes[type].name,
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
