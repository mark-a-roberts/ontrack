import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import SideNav from './components/SideNav';
import Map from './components/Map';
import {connect} from "react-redux";
import {filteredAlerts} from "./reducers/alerts";

import './App.css';

const App: React.FC = (props: any) => {
    let defaultProps = {
        defaultCenter: {
            lat: 51.5,
            lng: -0.20
        },
        defaultZoom: 10
    };
    return (
        <Router>
            <div className='App'>
                <SideNav/>
                <div style={{height: '100vh', width: '100%'}}>
                    <Map alerts={props.alerts} {...defaultProps}/>
                </div>
            </div>
        </Router>
    );
};

/*
    AlertList
 */
const mapState = (state: any) => {
    return {
        map: state.map,
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        filter: state.filter,
        sort: state.sort
    }
};

const connector = connect(mapState)(App);

export default connector;
