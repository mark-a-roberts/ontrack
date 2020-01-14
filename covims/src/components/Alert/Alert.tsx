import React, {HTMLProps, MouseEvent} from 'react';
import {connect, ConnectedProps} from "react-redux";
import classNames from "classnames";

import './Alert.scss';

import {Incident} from "../../data/incident";
import {CCTV} from "../../data/cctv";
import {Alert} from "../../data/alert";
import {timeDifference, close} from "../../data/helpers";

/* Redux Connect */

const nearIncidents = (incidents: Incident[], lat: number, lon: number, limit: number) => {
    const result = incidents.filter((item: Incident) => (close(item, lat, lon) < 0.5));
    return result.slice(0, limit);
};

const nearCCTV = (cctv: CCTV[], lat: number, lon: number, limit: number) => {
    const result = cctv.filter((item: CCTV) => (close(item, lat, lon) < 0.5));
    return result.slice(0, limit);
};

const mapState = (state: any, ownProps: any) => {

    const alert: Alert = state.alerts.find((a: Alert) => (a.id === ownProps.alertId));
    const cctv = nearCCTV(state.cctv, alert.lat, alert.lng, 3);
    const incidents = nearIncidents(state.incidents, alert.lat, alert.lng, 3);

    return {
        alert,
        cctv,
        incidents
    }
};

let connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>

/*
    Alert
 */


interface AlertProps {
    alertId: string,
    alert: Alert,
    toggle: (e: MouseEvent<HTMLElement>) => void;
    incidents: Incident[];
    cctv: CCTV[];
}

interface State {
}

type Props = AlertProps & HTMLProps<HTMLLIElement> & PropsFromRedux;

class AlertView extends React.Component<Props, State> {
    render() {
        const {alertId, alert, cctv, incidents, open, className, toggle, dispatch, ...otherProps} = this.props;
        const {title, text, completed, time, area} = {...alert};
        const now = new Date();
        const aClass = 'alert' + (completed ? '' : ' alert--new');
        const viewTime = time ? timeDifference(now, time) : '---';
        const attr = {
            id: 'alert-' + alertId,
            'data-id': alertId
        };
        return open ?
            <li className={classNames(aClass, 'alert--open', className)} {...attr} {...otherProps}>
                <h2>{title} <span className="alert-close" onClick={toggle}>X</span></h2>
                <p>{text}</p>
                <p>{viewTime}</p>
                <div><h5>What would you like to do to this alert?</h5>
                    <button type='button' className='button primary'>Convert into an incident</button>
                    <button type='button' className='button primary'>Dismiss alert</button>
                </div>
                <div>
                    <h5>Related information</h5>
                    <details>
                        <summary>CCTV</summary>
                        {cctv ?
                            <ul className={'cctv-list'}>
                                {cctv.map((item: CCTV) => (
                                    <li key={item.id} className={'cctv'}>
                                        <div className={'cctv-id'}>{item.id}</div>
                                        <div className={'cctv-location'}>{item.commonName}</div>
                                        <div className={'cctv-type'}>{item.placeType}</div>
                                    </li>
                                ))}
                            </ul>
                            :
                            <p>No CCTV Available</p>
                        }
                    </details>
                    <details>
                        <summary>TIMS</summary>
                        {incidents ?
                            <ul className={'incident-list'}>
                                {
                                    incidents.map((item: Incident) => (
                                        <li key={item.id} className={'incident'}>
                                            <div className={'incident-id'}>{item.id}</div>
                                            <div className={'incident-location'}>{item.location}</div>
                                            <div
                                                className={'incident-category'}>{item.category}|{item.subCategory}</div>
                                        </li>
                                    ))
                                }
                            </ul>
                            :
                            <p>No Incidents</p>
                        }
                    </details>
                </div>
            </li> :
            <li className={classNames(aClass, className)} onClick={toggle} {...attr} {...otherProps}>
                <div className='oval alert-area'>
                    {(area && area.charAt(0).toUpperCase()) || '-'}
                </div>
                <div className='alert-info'>
                    <h4 className='alert-category'>{title}</h4>
                    <div className='alert-location'>{text}</div>
                </div>
                <div className='alert-time'>
                    {viewTime}
                </div>
            </li>;
    }
}

export default connector(AlertView);
