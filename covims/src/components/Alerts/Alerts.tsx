import React, {ChangeEvent, HTMLProps} from 'react';
import {connect, ConnectedProps} from "react-redux";
import classNames from "classnames";

import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCarCrash,
    faCarSide,
    faSmog,
    faTimesCircle,
    faTrafficLight,
    faTruckPickup
} from "@fortawesome/free-solid-svg-icons";

import {capitalize} from "../../data/helpers";
import {filteredAlerts} from "../../reducers/alerts";
import {filterToggle} from "../../actions";

import SidePanel from "../SidePanel";
import AlertList from "../AlertList";

import './Alerts.scss';

function FilterButton(props: any) {
    let selected = props.filter.indexOf(props.id);
    // @ts-ignore
    return <button className={'filter' + ((selected >= 0) ? ' selected' : '')}
                   id={props.id}
                   onClick={() => props.filterToggle(props.id)}
    >
        <Icon icon={props.icon}/>
        <div>{props.children}</div>
    </button>
}

interface ViewProps {
    alerts?: object[]
    filter: string[]
    areas?: string[]
    filterToggle: any
}

interface ViewState {
}

type AllProps = ViewProps &  HTMLProps<HTMLDivElement>;


class Alerts extends React.Component<AllProps, ViewState> {

    doChange = (e: ChangeEvent) => {
        e.persist();
        console.log(e)
    }

    render() {
        const {areas, alerts, filter, filterToggle, className} = this.props;
        const alertTitle = (alerts && alerts.length) ?
            alerts.length + (alerts.length > 1 ? ' Alerts' : ' Alert') : 'No Alerts';

        return <SidePanel className={classNames('alerts', className)}>
            <h1>Alerts <span className='alerts-areas'>{areas ? areas.map((a) => capitalize(a)).join(', ') : ''}</span>
            </h1>
            <div className='well'>
                <h3>Filters</h3>
                <div className='filter-row'>
                    <FilterButton id='broken' icon={faTruckPickup}
                                  filter={filter} filterToggle={filterToggle}>
                        Breakdowns
                    </FilterButton>
                    <FilterButton id='collision' icon={faCarCrash}
                                  filter={filter} filterToggle={filterToggle}>
                        Collision
                    </FilterButton>
                    <FilterButton id='lights' icon={faTrafficLight}
                                  filter={filter} filterToggle={filterToggle}>
                        Faulty Signals
                    </FilterButton>
                </div>
                <div className='filter-row'>
                    <FilterButton id='closure' icon={faTimesCircle}
                                  filter={filter} filterToggle={filterToggle}>
                        Road Closure
                    </FilterButton>
                    <FilterButton id='hazard' icon={faSmog}
                                  filter={filter} filterToggle={filterToggle}>
                        Hazards
                    </FilterButton>
                    <FilterButton id='traffic' icon={faCarSide}
                                  filter={filter} filterToggle={filterToggle}>
                        Traffic
                    </FilterButton>
                </div>
            </div>
            <h3 className='well'>
                <span className='alerts-sorting'>
                    Sorted by:
                    <select onChange={this.doChange} name='alert-sort'>
                        <option>Recent First</option>
                        <option>Oldest First</option>
                    </select>
                </span>
                {alertTitle}
            </h3>
            <AlertList alerts={alerts}/>
        </SidePanel>
    }
}


const mapState = (state: any) => {
    return {
        areas: state.areas,
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        filter: state.filter,
    }
};

const mapDispatch = {
    filterToggle: (index: string) => (filterToggle(index))
};

const connector = connect(mapState, mapDispatch)(Alerts);

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector;
