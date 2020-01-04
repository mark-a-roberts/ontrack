interface Geography {
    type: string,
    coordinates: Array<number>
    crs: {
        type: string;
        properties?: {
            name: string;
        }
    }
}
interface Geometry {
    type: string,
    coordinates: Array<any>,
    crs: {
        type: string;
        properties?: {
            name: string;
        }
    }
}

interface Segment {
    $type: string;
    toid: string;
    lineString: string // ;"[[-0.061771,51.589018],[-0.060949,51.590997]]",
    sourceSystemId: number // integer ?
}

interface Street {
    $type: string; // "Tfl.Api.Presentation.Entities.Street, Tfl.Api.Presentation.Entities",
    name: string; // "Ashley Road (N17)",
    closure: string; // "Open",
    directions: string; // "All Directions",
    segments: Segment[],
    sourceSystemId: number;
    sourceSystemKey: string; // "TIMS"
}

export interface Incident {
    $type: string;  // "Tfl.Api.Presentation.Entities.RoadDisruption, Tfl.Api.Presentation.Entities",
    id: string; // "TIMS-206096",
    url: string; // "/Road/All/Disruption/TIMS-206096",
    point: string; // "[-0.062673,51.589121]",
    severity: string; // "Severe",
    ordinal: number; // 1,
    category: string; // "Works",
    subCategory: string; // "Borough",
    comments: string; // "[A1055] Watermead Way (N17) (All Directions) at the junction of [A503] Hale Road and The Hale and Ferry Lane and Monument Way - Various lane restrictions and phased closures for a major Borough Highway Scheme. [A503] ",
    currentUpdate: string; // "Delays are possible.",
    currentUpdateDateTime: string; // "2020-01-03T12:43:34Z",
    corridorIds: string[],
    startDateTime: string; // "2019-01-14T09:00:00Z",
    endDateTime: string; // "2020-07-31T17:00:00Z",
    lastModifiedTime: string; // "2020-01-03T12:43:34Z",
    levelOfInterest: string; // "High",
    location: string; // "[A1055] Watermead Way (N17) (Haringey)",
    status: 'Active' | 'Active Long Term' | 'Scheduled' ; // "Active Long Term",
    geography: Geography,
    geometry: Geometry;
    streets: Street[];

    isProvisional: boolean,
    hasClosures: boolean,
    roadDisruptionLines: [],
    roadDisruptionImpactAreas: [],
    recurringSchedules: [],
    // custom values
    lat: number,
    lon: number
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
