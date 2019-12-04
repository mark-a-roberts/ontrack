import React from 'react';
import logo from '../tfl-ui/logo.svg';
import AlertList from '../alert';
import Settings from '../settings';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faCog }  from '@fortawesome/free-solid-svg-icons'
import { faBell }  from '@fortawesome/free-regular-svg-icons'


import './sidebar.scss';

interface IState {
    mode?: string;
}

interface IProps {

}

class Sidebar extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            mode: 'alert',
        };
    };

    alertMode = (e: React.MouseEvent) => {
        this.setState({mode: 'alert'})
    };

    settingMode = (e: React.MouseEvent) => {
        this.setState({mode: 'setting'})
    };

    render() {
        const { mode } = this.state;

        return (
            <div className='flex'>
                <div className='sidebar'>
                    <div className='sidebar-logo'>
                        <img src={logo} alt='tfl'/>
                        <div>COV IMS</div>
                    </div>
                    <div id='alerts' className={'sidebar-button' + ((mode === 'alert') ? ' selected' : '')}
                         onClick={this.alertMode}>
                        <Icon icon={faBell} size="3x" />
                        <div>Alerts</div>
                    </div>
                    <div id='settings' className={'sidebar-button' + ((mode === 'setting') ? ' selected' : '')}
                         onClick={this.settingMode}>
                        <Icon icon={faCog} size="3x" />
                        <div>Settings</div>
                    </div>
                </div>
                {mode === 'setting' &&
                    <Settings />
                }
                {mode === 'alert' &&
                <AlertList />
                }
            </div>
        )
    }
}

export default Sidebar;
