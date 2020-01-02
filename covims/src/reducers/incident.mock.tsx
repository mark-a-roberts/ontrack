import {Incident, incidentTypes,incidentKeys} from "../data/incident";

function testDate(start = new Date(2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomIncident = () => {
    return incidentKeys[incidentKeys.length * Math.random() << 0];
};

export const mockIncident = (): Incident => {
    const type = randomIncident();
    let position = {
        lat: 51.25 + Math.random() * 0.5,
        lng: -0.70 + Math.random(),
    };

    return {
        id: '' + Math.floor(Math.random() * 1000000),
        type,
        title: incidentTypes[type].name,
        text: 'some text',
        time: testDate(),
        ...position,
        completed: Math.random() > 0.5 ? true : false
    }
};
