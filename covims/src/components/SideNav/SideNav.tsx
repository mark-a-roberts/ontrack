import React from 'react';
import {Route, Switch} from "react-router";
import {NavLink} from "react-router-dom";
import logo from '../../tfl-ui/logo.svg';

import AlertList from '../AlertList';
import Settings from '../Settings';

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/free-solid-svg-icons'
import {faBell} from '@fortawesome/free-regular-svg-icons'

import './SideNav.scss';

interface IProps {
}

const SideNav: React.FC<IProps> = (props) => {

    return (
        <div className='flex'>
            <div className='sidenav'>
                <div className='sidenav-logo'>
                    <img src={logo} alt='tfl'/>
                    <div>COV IMS</div>
                </div>
                <NavLink id='alerts' to='alerts' className={'sidenav-button'} activeClassName='selected'>
                    <Icon icon={faBell} size="3x"/>
                    <div>Alerts</div>
                </NavLink>
                <NavLink id='settings' to='settings' className={'sidenav-button'} activeClassName='selected'>
                    <Icon icon={faCog} size="3x"/>
                    <div>Settings</div>
                </NavLink>
            </div>
            <Switch>
                <Route path='/alerts'>
                    <AlertList/>
                </Route>
                <Route>
                    <Settings/>
                </Route>
            </Switch>

        </div>
    )
};


export default SideNav;
