import React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {filterToggle} from "../actions";
import {IAlert} from "../reducers/alerts";

interface IProps {
    alerts?:  object[]
    filter: string[]
    filterToggle: any
}

type MyProps = PropsFromRedux & IProps;

const filteredAlerts = (alerts: IAlert[], filters: string[], areas: string[]) => {
    return filters.length ?
        alerts.filter( (a: IAlert) => (filters.indexOf(a.type) >= 0)) :
        alerts;
}

interface IProps {
    alerts?:  object[]
    filter: string[]
    areas?: string[]
    filterToggle: any
}

interface IState {
}

/*
    Alert
 */

interface AlertProps {
    key: string;
    title: string;
    text: string;
    time: number
}


function Alert(props: AlertProps) {
    return <div key={props.key}>
        <h4>{props.title}</h4>
        <p>{props.text}</p>
        <hr />
    </div>
}

/*
    AlertList
 */
const mapState = (state: any) => {
    return {
        alerts: filteredAlerts( state.alerts, state.filter, state.areas),
        filter: state.filter
    }
};

const mapDispatch = {
    filterToggle: (index:string) => (filterToggle(index))
};

type PropsFromRedux = ConnectedProps<typeof connector>

class AlertList extends React.Component<IProps, IState> {

    FilterButton(id: string, text: string) {
        let selected = this.props.filter.indexOf( id);
        // @ts-ignore
        return <button className={'filter' + ((selected >= 0) ? ' selected' : '')}
                       id={id}
                       onClick={() => this.props.filterToggle(id)}
        >{text}
        </button>
    }

    render() {
        const alerts = this.props.alerts;
        const alertTitle = (alerts && alerts.length) ?
            alerts.length + (alerts.length > 1 ? ' Alerts' : ' Alert') : 'No Alerts';

        return <div className='settings'>
            <h1>East | South</h1>
            <h2>Filters</h2>
            <div className='well'>
                <div className='filter-row'>
                    {this.FilterButton('broken', 'Broken Down')}
                    {this.FilterButton('collision', 'Collision')}
                    {this.FilterButton('lights', 'Faulty Traffic Light')}
                </div>
                <div className='filter-row'>
                    {this.FilterButton('closure', 'Road Closure')}
                    {this.FilterButton('hazard', 'Hazards')}
                    {this.FilterButton('traffic', 'Traffic')}
                </div>
            </div>
            <div className='well'>
                <h3>{alertTitle}</h3>
                <p>Sorted by:</p>
                {alerts && alerts.map( (a:any) => Alert(a))}
            </div>
        </div>
    }
}

const connector = connect(mapState, mapDispatch)(AlertList);

export default connector;
