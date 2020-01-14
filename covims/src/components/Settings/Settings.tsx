import React from "react";
import {connect, ConnectedProps} from 'react-redux';
import {Link} from "react-router-dom";

import {Area} from "../../data/area";
import { areaToggle} from "../../actions";
import Switch from "react-switch";

import SidePanel from "../SidePanel";

import './Settings.scss';

/*
    Settings
 */
const mapState = (state: any) => {
    return {
        areas: state.areas,
    }
};

const mapDispatch = {
    areaToggle: (index: string) => (areaToggle(index))
};

const connector = connect(mapState, mapDispatch);

interface State {
    checked: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector>

interface SettingsProps {
    areaToggle: (s: string) => void
}

type Props = SettingsProps & PropsFromRedux;

class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(checked: any, e: any, id: string) {
        this.props.areaToggle(id);
    }

    render() {
        const {areas} = this.props;
        // @ts-ignore
        return <SidePanel className='settings'>
            <h2>My Settings</h2>
            <div className='well white'>
                <h3>Monitoring Area</h3>
                <p>Select your area</p>
                {areas.map((a: Area) => {

                        // @ts-ignore
                        let check = !!a.value;
                        return <div key={a.key}>
                            <label>
                                <span className="areaName">{a.name}</span>
                                <Switch id={a.key} onChange={this.handleChange} checked={check}/>
                            </label>
                        </div>
                    }
                )
                }
                <div>
                    <Link className='button primary' to={areas.find( (a: Area) => (a.value) ) ? '/alerts' : '#'} >Go to alerts</Link>
                </div>
            </div>
            <div className='well white'>
                <h3>Log Out</h3>
                <p>Click the button below to log out of COV IMS</p>
                <button className='button secondary'>Log Out</button>
            </div>
        </SidePanel>
    }
}


export default connector(Settings);
