import {CCTV, cctvTypes, cctvKeys} from "../data/cctv";

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
        ...position
    }
};
