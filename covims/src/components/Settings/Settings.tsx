import React from "react";
import {connect} from 'react-redux';
import {areas, areaToggle} from "../../actions";
import Switch from "react-switch";

import './Settings.scss';

interface IProps {
    areas: string[],
    areaToggle: any
}

interface IState {
    checked: boolean
}


/*
    Settings
 */
const mapState = (state: any) => {
    return {
        areas:  state.areas,
    }
};

const mapDispatch = {
    areaToggle: (index:string) => (areaToggle(index))
};

class Settings extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(checked: any, e: any, id: string) {
        this.props.areaToggle(id);
    }

    render() {
        // @ts-ignore
        return <div className='settings'>
            <h2>My Settings</h2>
            <div className='well white'>
                <h3>Monitoring Area</h3>
                <p>Select your area</p>
                {areas.map((a) => {

                        // @ts-ignore
                        let check = (this.props.areas && (this.props.areas.indexOf(a.key) >= 0)) || false;
                        return <div key={a.key}>
                            <label>
                                <span className="areaName">{a.name}</span>
                                <Switch id={a.key} onChange={this.handleChange} checked={check} />
                            </label>
                        </div>
                    }
                )
                }
                <button className='button primary'>Go to alerts</button>
            </div>
            <div className='well white'>
                <h3>Log Out</h3>
                <p>Click the button below to log out of COV IMS</p>
                <button className='button secondary'>Log Out</button>
            </div>
        </div>
    }
}

const connector = connect(mapState, mapDispatch)(Settings);

export default connector;
