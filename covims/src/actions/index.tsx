/*
    Alert Filters
*/
export const FILTER_ON = 'FILTER ON';
export const FILTER_OFF = 'FILTER OFF';
export const FILTER_TOGGLE = 'FILTER TOGGLE';

export type FILTER_ACTION = typeof FILTER_ON | typeof FILTER_OFF | typeof FILTER_TOGGLE;

interface FilterToggleAction {
    type: typeof FILTER_TOGGLE
    payload: string
}

interface FilterOffAction {
    type: typeof FILTER_OFF
    payload: string
}

interface FilterOnAction {
    type: typeof FILTER_ON
    payload: string
}

export type FilterActionTypes = FilterToggleAction | FilterOffAction | FilterOnAction

export function filterToggle(filter: string): FilterActionTypes {
    return {
        type: FILTER_TOGGLE,
        payload: filter
    }
}

/*
    Area Filters
 */
export const AREA_ON  = 'AREA_ON';
export const AREA_OFF  = 'AREA_OFF';
export const AREA_TOGGLE  = 'AREA_TOGGLE';

interface IArea {
    key: string,
    name: string
}

export const areas: IArea[] = [
    { key: 'north', name: 'North'},
    { key: 'east', name: 'East'},
    { key: 'south', name: 'South'},
    { key: 'central', name: 'Central'}
];

export type AREA_ACTION = typeof AREA_ON | typeof AREA_OFF | typeof AREA_TOGGLE;

export interface AreaAction {
    type: AREA_ACTION
    payload: string
}

export function areaToggle(area: string): AreaAction {
    return {
        type: AREA_TOGGLE,
        payload: area
    }
}

export function areaOn(area: string): AreaAction {
    return {
        type: AREA_ON,
        payload: area
    }
}

export function areaOff(area: string): AreaAction {
    return {
        type: AREA_OFF,
        payload: area
    }
}
