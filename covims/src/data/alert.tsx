export interface Alert {
    id: string;
    type: string;
    area: string;
    title: string;
    text: string;
    time: Date;
    lat: number;
    lng: number;
    completed: boolean;
}

export type AlertType = {
    [key: string]: {
        name: string;
    }
};

const alertTypes: AlertType = {
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

export {alertTypes, alertKeys}
