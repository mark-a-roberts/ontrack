export interface Incident {
    id: string;
    type?: string;
    title: string;
    text?: string;
    time?: Date;
    lat?: number;
    lng?: number;
    completed?: boolean;
}

type IncidentInstance = {
    [key: string]: {
        name: string;
    }
};

const incidentTypes: IncidentInstance = {
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

const incidentKeys = Object.keys(incidentTypes);

export {incidentTypes, incidentKeys}
