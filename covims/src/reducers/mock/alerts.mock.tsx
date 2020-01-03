import {Alert, alertTypes, alertKeys} from "../../data/alert";

function testDate(start = new Date(2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomAlert = () => {
    return alertKeys[alertKeys.length * Math.random() << 0];
};

export const mockAlert = (): Alert => {
    const type = randomAlert();
    let position = {
        lat: 51.25 + Math.random() * 0.5,
        lng: -0.70 + Math.random(),
    };

    let area = (position.lat < 51.5) ? 'south' :
        ((position.lng > 0.10) ? 'east' : ((position.lng < -0.10) ? 'west' : 'central'));
    return {
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
