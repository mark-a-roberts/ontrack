import React from 'react';
import logo from '../tfl-ui/logo.svg';
import bell from '../tfl-ui/bell';
import settings from '../tfl-ui/settings';
import  Alert from '../alert';
import {IAlert} from '../reducers/alerts'
import {filterToggle} from "../actions";
import './sidebar.scss';

import {connect, ConnectedProps} from 'react-redux';


type PropsFromRedux = ConnectedProps<typeof connector>

interface IProps {
    alerts?:  object[]
    filter: string[]
    filterToggle: any
}

type MyProps = PropsFromRedux & IProps;

const filteredAlerts = (alerts: IAlert[], filters: string[]) => {
    return filters.length ?
        alerts.filter( (a: IAlert) => (filters.indexOf(a.type) >= 0)) :
        alerts;
}

const mapState = (state: any) => {
    console.log( state);
    return {
        alerts: filteredAlerts( state.alerts, state.filter),
        filter: state.filter
    }
};

const mapDispatch = {
    filterToggle: (index:string) => (filterToggle(index))
}


interface IState {
    mode?: string;
}


class Sidebar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            mode: 'alert',
        };
    };

    FilterButton(id: string, text: string) {
        let selected = this.props.filter.indexOf( id);
        // @ts-ignore
        return <button className={'filter' + ((selected >= 0) ? ' selected' : '')}
                       id={id}
                       onClick={() => this.props.filterToggle(id)}
        >{text}
        </button>
    }

    alertMode = (e: React.MouseEvent) => {
        this.setState({mode: 'alert'})
    };

    settingMode = (e: React.MouseEvent) => {
        this.setState({mode: 'setting'})
    };

    render() {
        const mode = this.state.mode;
        const alerts = this.props.alerts;

        return (
            <div className='flex'>
                <div className='sidebar'>
                    <div className='sidebar-logo'>
                        <img src={logo} alt='tfl'/>
                        <div>COV IMS</div>
                    </div>
                    <div id='alerts' className={'sidebar-button' + ((mode === 'alert') ? ' selected' : '')}
                         onClick={this.alertMode}>
                        {bell}
                        <div>Alerts</div>
                    </div>
                    <div id='settings' className={'sidebar-button' + ((mode === 'setting') ? ' selected' : '')}
                         onClick={this.settingMode}>
                        {settings}
                        <div>Settings</div>
                    </div>
                </div>
                {mode === 'setting' &&
                <div className='settings'>
                    <h2>My Settings</h2>
                    <div className='well'>
                        <h3>Monitoring Area</h3>
                        <p>Select your area</p>
                        <div>North</div>
                        <div>East</div>
                        <div>South</div>
                        <div>Central</div>
                        <button className='button primary'>Go to alerts</button>
                    </div>
                    <div className='well'>
                        <h3>Log Out</h3>
                        <p>Click the button below to log out of COV IMS</p>
                        <button className='button secondary'>Log Out</button>
                    </div>
                </div>
                }
                {mode === 'alert' &&
                <div className='settings'>
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
                        <h3>{alerts && alerts.length} Alerts</h3>
                        <p>Sorted by:</p>
                        {alerts && alerts.map( (a:any) => Alert(a))}
                    </div>
                </div>
                }
            </div>
        )
    }
}

const connector = connect(mapState, mapDispatch)(Sidebar);


export default connector;
