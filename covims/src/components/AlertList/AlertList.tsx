import React, {ChangeEvent} from "react";
import {connect, ConnectedProps} from "react-redux";

import {filteredAlerts} from "../../reducers/alerts";
import {filterToggle} from "../../actions";

import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCarCrash,
    faCarSide,
    faSmog,
    faTimesCircle,
    faTrafficLight,
    faTruckPickup
} from "@fortawesome/free-solid-svg-icons";
import Alert from '../Alert';

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

interface IProps {
    alerts?: object[]
    filter: string[]
    areas?: string[]
    filterToggle: any
}

interface IState {
}

type MyProps = PropsFromRedux & IProps;

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
                        <Alert key={a.id} title={a.title} text={a.text} time={a.time}/>))}
                </div>
            </div>
        </div>
    }
}

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

const connector = connect(mapState, mapDispatch)(AlertList);

export default connector;
