import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import SideNav from './components/SideNav';
import {connect} from "react-redux";
import {filteredAlerts} from "./reducers/alerts";

import './App.scss';
import EsriMap from "./components/EsriMap";

const App: React.FC = (props: any) => {
    return (
        <Router>
            <div className='App'>
                <SideNav/>
                <div style={{height: '100vh', width: '100%'}}>
                    <EsriMap/>
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
        filter: state.filter
    }
};

const connector = connect(mapState)(App);

export default connector;
