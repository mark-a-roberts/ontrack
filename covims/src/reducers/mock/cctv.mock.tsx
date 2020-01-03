import {CCTV, cctvTypes, cctvKeys} from "../../data/cctv";
import cameras from './jamcam.json';

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

export const cctvList = (): CCTV[] => {
    return cameras.map(
        (camera: any) => {
            return {
                id: camera.id,
                title: camera.commonName,
                type: camera.placeType,
                lat: camera.lat,
                lng: camera.lon,
            }
        }
    )
};
