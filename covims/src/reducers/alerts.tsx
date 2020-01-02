import {Alert} from "../data/alert";
import {mockAlert} from './alerts.mock';

const initialState: Array<Alert> = Array.from({length: 1000}, () => mockAlert());

class ActionType {
    id!: string;
    type!: string;
    payload!: Alert;
}

export function alertReducer(state = initialState, action: ActionType): Array<Alert> {
    // When the app loads this would check for the state, which is undefined, so set it to null in the argument.
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    ...action.payload
                }];
        case 'DELETE':
            return state.filter(
                alert => alert.id !== action.payload.id
            );
        default:
            return state;
    }
}

type Comparator = (a: any, b: any) => number;

const sorters: { [key: string]: Comparator } = {
    latest: (a: any, b: any) => (b.time - a.time),
    oldest: (a: any, b: any) => (a.time - b.time)
};

export const filteredAlerts = (alerts: Alert[], filters: string[], areas: string[]) => {
    // probably need to filter by area bounding boxes...
    const inArea = alerts.filter((a) => (areas.indexOf(a.area) > -1));
    return filters.length ?
        inArea.filter((a: Alert) => (filters.indexOf(a.type) >= 0)) :
        inArea;
};

export const sortedAlerts = (alerts: Alert[], sort: 'latest' | 'oldest') => {
    return alerts.sort(sorters[sort]);
};
