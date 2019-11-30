import React from 'react';
import logo from '../tfl-ui/logo.svg';
import bell from '../tfl-ui/bell';
import settings from '../tfl-ui/settings';
import Alert from '../alert';
import './sidebar.scss';

import {connect} from 'react-redux';


interface IProps {
    alerts?:  object[]
}

interface IFilter {
    closure: boolean;
    hazard: boolean;
    traffic: boolean;
    lights: boolean;
    broken: boolean
    collision: boolean;
}

interface IState {
    mode?: string;
    filter: IFilter
}


class Sidebar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            mode: 'alert',
            filter: {
                closure: false,
                hazard: false,
                traffic: false,
                lights: false,
                broken: false,
                collision: false
            }
        };
    };

    FilterButton(id: string, text: string) {
        // @ts-ignore
        return <button className={'filter' + (this.state.filter[id] ? ' selected' : '')}
                       id={id}
                       onClick={() => this.toggle(id)}
        >{text}
        </button>
    }

    alertMode = (e: React.MouseEvent) => {
        this.setState({mode: 'alert'})
    };

    settingMode = (e: React.MouseEvent) => {
        this.setState({mode: 'setting'})
    };

    toggle = (index: string) => {
        let filter: IFilter = {...this.state.filter};
        // @ts-ignore
        filter[index] = !filter[index];
        console.log('filter toggle:' + index);
        this.setState({filter});
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
                        <button className='primary'>Go to alerts</button>
                    </div>
                    <div className='well'>
                        <h3>Log Out</h3>
                        <p>Click the button below to log out of COV IMS</p>
                        <button className='secondary'>Log Out</button>
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

const mapState = (state: any) => {
    console.log( state);
    return {
        alerts: state.alerts,
        filter: state.filter
    }
};

const ConnectedBar = connect(mapState)(Sidebar);

export default ConnectedBar;
