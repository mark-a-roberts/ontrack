import {CCTV} from "../../data/cctv";
import cameras from './jamcam.json';

export const cctvList = (): CCTV[] => {
    return cameras.map(
        (camera: any) => {
            return {
                ...camera
            }
        }
    )
};
