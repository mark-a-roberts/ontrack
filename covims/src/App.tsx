import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import SideNav from './components/SideNav';
import {connect, ConnectedProps} from "react-redux";
import {filteredAlerts} from "./reducers/alerts";

import './App.scss';
import EsriMap from "./components/EsriMap";
import Map from "./components/Map";

const mapState = (state: any) => {
    return {
        map: state.map,
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        cctv: state.cctv,
        incidents: state.incidents,
        filter: state.filter
    }
};

const connector = connect(mapState);

type ReduxProps = ConnectedProps<typeof connector>;

const App: React.FC = (props: ReduxProps & any) => {
    let esri = false;
    return (
        <Router>
            <div className='App'>
                <SideNav/>
                <div style={{height: '100vh', width: '100%'}}>
                    {esri ? <EsriMap/> : <Map alerts={props.alerts} cctv={props.cctv} incidents={props.incidents} {...props.map}/>}
                </div>
            </div>
        </Router>
    );
};

export default connector(App);
