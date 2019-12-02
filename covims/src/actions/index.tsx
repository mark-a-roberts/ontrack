export const FILTER_ON = 'FILTER ON';
export const FILTER_OFF = 'FILTER OFF';
export const FILTER_TOGGLE = 'FILTER TOGGLE';

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
