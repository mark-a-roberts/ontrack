export interface CCTV {
    id: string;
    type?: string;
    title: string;
    text?: string;
    lat?: number;
    lng?: number;
}

type CCTVInstance = {
    [key: string]: {
        name: string;
    }
};


const cctvTypes: CCTVInstance = {
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

const cctvKeys = Object.keys(cctvTypes);

export {cctvTypes, cctvKeys}
