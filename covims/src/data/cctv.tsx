interface Property {
    $type: string; //Tfl.Api.Presentation.Entities.AdditionalProperties, Tfl.Api.Presentation.Entities",
    category: string; //payload",
    key: string; //available",
    sourceSystemKey: string; //JamCams",
    value: string; //true",
    modified: string; //2019-12-23T19:13:01.353Z"
}

interface Available extends Property {
    key: "available";
}

interface ImageUrl extends Property {
    key: "ImageUrl";
}

interface VideoUrl extends Property {
    key: "videoUrl";
}

interface CameraView extends Property {
    key: "view";
}

export interface CCTV {
    $type: string; // Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
    id: string; // "JamCams_00002.00865",
    url: string; // "/Place/JamCams_00002.00865",
    commonName: string; // "A406 Billet Upass E",
    placeType: string; // "JamCam",
    additionalProperties: [
        Available | ImageUrl | VideoUrl | CameraView
    ],
    children: [],
    childrenUrls: [],
    lat: number; //  51.6007,
    lon: number; // -0.01594
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
