import React from 'react';
import {Route, Switch} from "react-router";
import { NavLink } from "react-router-dom";
import logo from '../../tfl-ui/logo.svg';

import SidePanel from '../SidePanel';
import AlertList from '../AlertList';
import Settings from '../Settings';


import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import { faCog }  from '@fortawesome/free-solid-svg-icons'
import { faBell }  from '@fortawesome/free-regular-svg-icons'


import './SideNav.scss';

interface IProps {
}

class SideNav extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    };

    render() {

        return (
            <div className='flex'>
                <div className='sidenav'>
                    <div className='sidenav-logo'>
                        <img src={logo} alt='tfl'/>
                        <div>COV IMS</div>
                    </div>
                    <NavLink id='alerts' to='alerts' className={'sidenav-button'} activeClassName='selected'>
                        <Icon icon={faBell} size="3x" />
                        <div>Alerts</div>
                    </NavLink>
                    <NavLink id='settings' to='settings' className={'sidenav-button'} activeClassName='selected'>
                        <Icon icon={faCog} size="3x" />
                        <div>Settings</div>
                    </NavLink>
                </div>
                <Switch>
                    <Route path='/alerts'>
                        <SidePanel>
                            <AlertList />
                        </SidePanel>
                    </Route>
                    <Route>
                        <SidePanel>
                            <Settings />
                        </SidePanel>
                    </Route>
                </Switch>


            </div>
        )
    }
}

export default SideNav;
