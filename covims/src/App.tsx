import React from 'react';
import Sidebar from './sidebar';
import './App.css';
import Map from './map'
import {connect} from "react-redux";
import {filteredAlerts} from "./reducers/alerts";


const App: React.FC = (props:any) => {
    let defaultProps = {
        center: {
            lat: 51.5,
            lng: -0.12
        },
        zoom: 11
    };
  return (
    <div className="App">
      <Sidebar />
        <div style={{ height: '100vh', width: '100%' }}>
            <Map alerts={props.alerts} {...defaultProps}/>
        </div>
    </div>
  );
};

/*
    AlertList
 */
const mapState = (state: any) => {
    return {
        alerts: filteredAlerts(state.alerts, state.filter, state.areas),
        filter: state.filter,
        sort: state.sort
    }
};

const connector = connect(mapState)(App);

export default connector;
