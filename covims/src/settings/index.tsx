import React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {areaToggle} from "../actions";
import {IArea} from "../reducers/area";


interface IProps {
    areas?: string[]
}

interface IState {
}

type MyProps = PropsFromRedux & IProps;

/*
    Settings
 */
const mapState = (state: any) => {
    console.log( state);
    return {
        areas:  state.areas,
    }
};

const mapDispatch = {
    areaToggle: (index:string) => (areaToggle(index))
};

type PropsFromRedux = ConnectedProps<typeof connector>

class Settings extends React.Component<IProps, IState> {

    render() {

        return <div className='settings'>
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
}

const connector = connect(mapState, mapDispatch)(Settings);

export default connector;


