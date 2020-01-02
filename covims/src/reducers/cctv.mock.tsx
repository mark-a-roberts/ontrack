import {CCTV, cctvTypes, cctvKeys} from "../data/cctv";

function testDate(start = new Date(2019, 11, 1), end = new Date()) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const randomCCTV = () => {
    return cctvKeys[cctvKeys.length * Math.random() << 0];
};

export const mockCCTV = (): CCTV => {
    const type = randomCCTV();
    let position = {
        lat: 51.25 + Math.random() * 0.5,
        lng: -0.70 + Math.random(),
    };

    return {
        id: '' + Math.floor(Math.random() * 1000000),
        type,
        title: cctvTypes[type].name,
        text: 'some text',
        time: testDate(),
        ...position,
        completed: Math.random() > 0.5 ? true : false
    }
};
