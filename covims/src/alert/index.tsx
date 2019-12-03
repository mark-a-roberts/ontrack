import React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {filterToggle} from "../actions";
import {IAlert} from "../reducers/alerts";

interface IProps {
    alerts?: object[]
    filter: string[]
    filterToggle: any
}

type MyProps = PropsFromRedux & IProps;

const filteredAlerts = (alerts: IAlert[], filters: string[], areas: string[]) => {
    return filters.length ?
        alerts.filter((a: IAlert) => (filters.indexOf(a.type) >= 0)) :
        alerts;
};

interface IProps {
    alerts?: object[]
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
    title: string;
    text: string;
    time: Date
}

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

function timeDifference(t1: Date, t2: Date): string {
    const timeDiff = t1.getTime() - t2.getTime();
    let ds = '';
    if (timeDiff < HOUR) {
        let min = Math.floor(timeDiff / MIN);
        ds = (min !== 0) ? min + ' mins ago' : 'Now';
    } else {
        const today = t1.toDateString();
        let y: Date = new Date(t1);
        y.setDate(t1.getDate() - 1);
        const yesterday = y.toDateString();
        console.log( 'Today:' + today + ' Yesterday:' + yesterday);
        if (today === t2.toDateString()) {
            // today
            ds = 'Today';
        } else if (yesterday === t2.toDateString()) {
            // yesterday
            ds = 'Yesterday'
        } else {
            ds = t2.toLocaleDateString('en', { 'month': 'short', 'day': 'numeric'});
        }
        ds += ' at ' + t2.toLocaleTimeString('en', { 'hour': '2-digit', 'minute': '2-digit'} );
    }
    return ds;

}

function Alert(props: AlertProps) {
    const now = new Date();
    return <div className='alert'>
        <h4>{props.title}</h4>
        <div>{props.text}</div>
        <div className='alert-time'>{timeDifference(now, props.time)}</div>
        <hr/>
    </div>
}

/*
    AlertList
 */
const mapState = (state: any) => {
    return {
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        filter: state.filter
    }
};

const mapDispatch = {
    filterToggle: (index: string) => (filterToggle(index))
};

type PropsFromRedux = ConnectedProps<typeof connector>

class AlertList extends React.Component<IProps, IState> {

    FilterButton(id: string, text: string) {
        let selected = this.props.filter.indexOf(id);
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
            <div className='well alerts'>
                <h3>{alertTitle}</h3>
                <p>Sorted by:</p>
                <div className='alert-list'>
                    {alerts && alerts.map((a: any) => (
                        <Alert key={a.key} title={a.title} text={a.text} time={a.time}/>))}
                </div>
            </div>
        </div>
    }
}

const connector = connect(mapState, mapDispatch)(AlertList);

export default connector;
