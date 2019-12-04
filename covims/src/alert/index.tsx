import React, {ChangeEvent} from "react";
import {connect, ConnectedProps} from 'react-redux';
import {filterToggle} from "../actions";
import {IAlert} from "../reducers/alerts";
import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {
    faCarCrash, faCarSide, faTruckPickup, faTimesCircle, faTrafficLight, faSmog
}
    from
        '@fortawesome/free-solid-svg-icons'


interface IProps {
    alerts?: object[]
    filter: string[]
    filterToggle: any
}

type MyProps = PropsFromRedux & IProps;

const filteredAlerts = (alerts: IAlert[], filters: string[], areas: string[]) => {
    let sorted = alerts.slice().sort((a: any, b: any) => (b.time - a.time));
    return filters.length ?
        sorted.filter((a: IAlert) => (filters.indexOf(a.type) >= 0)) :
        sorted;
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
        if (min !== 0) {
            ds = min + ' mins ago';
        } else {
            ds = Math.floor(timeDiff / SEC) + ' secs ago';
        }
    } else {
        const today = t1.toDateString();
        let y: Date = new Date(t1);
        y.setDate(t1.getDate() - 1);
        const yesterday = y.toDateString();
        console.log('Today:' + today + ' Yesterday:' + yesterday);
        if (today === t2.toDateString()) {
            // today
            ds = 'Today';
        } else if (yesterday === t2.toDateString()) {
            // yesterday
            ds = 'Yesterday'
        } else {
            ds = t2.toLocaleDateString('en', {'month': 'short', 'day': 'numeric'});
        }
        ds += ' ' + t2.toLocaleTimeString('en', {'hour12': false, 'hour': '2-digit', 'minute': '2-digit'});
    }
    return ds;

}

function Alert(props: AlertProps) {
    const now = new Date();
    return <div>
        <div className='alert'>
            <div className='alert-type'>
                New
            </div>
            <div className='alert-info'>
                <h4>{props.title}</h4>
                <p>{props.text}</p>
            </div>
            <div className='alert-time'>
                {timeDifference(now, props.time)}
            </div>
        </div>
        <hr/>
    </div>
}

/*
    AlertList
 */
const mapState = (state: any) => {
    return {
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        filter: state.filter,
        sort: state.sort
    }
};

const mapDispatch = {
    filterToggle: (index: string) => (filterToggle(index))
};

type PropsFromRedux = ConnectedProps<typeof connector>

type MyOption = { label: string, value: number }

function FilterButton(props: any) {
    let selected = props.filter.indexOf(props.id);
    // @ts-ignore
    return <button className={'filter' + ((selected >= 0) ? ' selected' : '')}
                   id={props.id}
                   onClick={() => props.filterToggle(props.id)}
    >
        <Icon icon={props.icon} />
        <div>{props.children}</div>
    </button>
}

class AlertList extends React.Component<IProps, IState> {

    doChange = (e: ChangeEvent) => {
        e.persist();
        console.log(e)
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
                    <FilterButton id='broken' icon={faTruckPickup}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Broken Down
                    </FilterButton>
                    <FilterButton id='collision' icon={faCarCrash}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Collision
                    </FilterButton>
                    <FilterButton id='lights' icon={faTrafficLight}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Faulty Traffic Lights
                    </FilterButton>
                </div>
                <div className='filter-row'>
                    <FilterButton id='closure' icon={faTimesCircle}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Road Closure
                    </FilterButton>
                    <FilterButton id='hazard' icon={faSmog}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Hazards
                    </FilterButton>
                    <FilterButton id='traffic' icon={faCarSide}
                                  filter={this.props.filter} filterToggle={this.props.filterToggle}>
                        Traffic
                    </FilterButton>
                </div>
            </div>
            <div className='well alerts'>
                <h3>{alertTitle}</h3>
                <p>Sorted by: <select onChange={this.doChange} id='alert-sort'>
                    <option>Most Recent</option>
                    <option>Oldest</option>
                </select>
                </p>
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
