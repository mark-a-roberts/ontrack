import {Incident} from "../../data/incident";
import incidents from "./incidents.json";

export const incidentList = (): Incident[] => {
    return incidents.map(
        (incident: any) => {
            const point = JSON.parse(incident.point);
            return {
                lat: point[1],
                lon: point[0],
                ...incident
            }
        }
    )
};
