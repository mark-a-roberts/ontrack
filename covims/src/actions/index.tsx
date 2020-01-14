import {Area} from '../data/area';

/*
    Alert Filters
*/
export const FILTER_ON = 'FILTER ON';
export const FILTER_OFF = 'FILTER OFF';
export const FILTER_TOGGLE = 'FILTER TOGGLE';
export const FILTER_SORT = 'FILTER_SORT'

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

interface FilterSortAction {
    type: typeof FILTER_SORT
    payload: string
}

export type FilterActionTypes = FilterToggleAction | FilterOffAction | FilterOnAction | FilterSortAction;

export function filterToggle(filter: string): FilterActionTypes {
    return {
        type: FILTER_TOGGLE,
        payload: filter
    }
}

/*
    Area Filters
 */
export const AREA_UPDATE  = 'AREA_UPDATE';
export const AREA_TOGGLE  = 'AREA_TOGGLE';


export const initialAreas: Area[] = [
    { key: 'north', name: 'North'},
    { key: 'east', name: 'East'},
    { key: 'south', name: 'South'},
    { key: 'central', name: 'Central'}
];

export type AREA_ACTION = typeof AREA_UPDATE | typeof AREA_TOGGLE;

export interface AreaToggle {
    type: typeof AREA_TOGGLE
    payload: string
}

export interface AreaUpdate {
    type: typeof AREA_UPDATE
    payload: Area
}

export function areaToggle(area: string): AreaToggle {
    return {
        type: AREA_TOGGLE,
        payload: area
    }
}

export function areaUpdate(area: Area): AreaUpdate {
    return {
        type: AREA_UPDATE,
        payload: area
    }
}


/*
    Map Actions
*/

export const MAP_UPDATE  = 'MAP_UPDATE';

export type MAP_ACTION = typeof MAP_UPDATE;

export interface MapAction {
    type: string,
    payload: any
}

export function mapUpdate(payload:any) : MapAction {
    return {
        type: MAP_UPDATE,
        payload
    }
}
