import React, {HTMLProps, MouseEvent} from 'react';
import classNames from "classnames";

import './Alert.scss';

import {Incident} from "../../data/incident";
import {CCTV} from "../../data/cctv";

/*
    Alert
 */

interface AlertProps {
    title?: string;
    text?: string;
    /** Area of Alert */
    area?: string;
    /** Time of Alert */
    time?: Date,
    completed: boolean
    toggle: (e: MouseEvent<HTMLElement>) => void
}

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

function timeDifference(t1: Date, t2: Date): string {
    const timeDiff = t1.getTime() - t2.getTime();
    let ds = '';
    if (timeDiff < HOUR) {
        let min = Math.floor(timeDiff / MIN);
        ds = (min !== 0) ? min + ' mins ago' :
            Math.floor(timeDiff / SEC) + ' secs ago';
    } else {
        const today = t1.toDateString();
        let y: Date = new Date(t1);
        y.setDate(t1.getDate() - 1);
        const yesterday = y.toDateString();
        console.log('Today:' + today + ' Yesterday:' + yesterday);
        if (today === t2.toDateString()) {
            // today
            ds = 'Today';
        } else if (yesterday === t2.toDateString()) {
            // yesterday
            ds = 'Yesterday'
        } else {
            ds = t2.toLocaleDateString('en', {'month': 'short', 'day': 'numeric'});
        }
        ds += ' ' + t2.toLocaleTimeString('en', {'hour12': false, 'hour': '2-digit', 'minute': '2-digit'});
    }
    return ds;

}

type AllProps = AlertProps & HTMLProps<HTMLLIElement>;

const AlertView: React.FC<AllProps> = (props: AllProps) => {
    const incidents: Incident[] = [
        {id: 'tim-test1', title: '167 Blackfriars Rd', type: 'Hazerd | Flooding'},
        {id: 'tim-test2', title: '167 Blackfriars Rd', type: 'Accident'},
        {id: 'tim-test3', title: '167 Blackfriars Rd', type: 'Collision'}
    ];
    const cctv: CCTV[] = [
        {id: 'cctv-test1', title: '167 Blackfriars Rd', type: 'Borough'},
        {id: 'cctv-test2', title: '167 Blackfriars Rd', type: 'Police'},
        {id: 'cctv-test3', title: '167 Blackfriars Rd', type: 'TFL'}
    ];

    const {title, text, time, area, completed, open, className, toggle, ...otherProps} = props;
    const now = new Date();
    const aClass = 'alert' + (completed ? '' : ' alert--new');
    const viewTime = time ? timeDifference(now, time) : '---';
    return open ?
        <li className={classNames(aClass, 'alert--open', className)} {...otherProps}>
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
                    <ul className={'cctv-list'}>
                        {cctv.map((item: CCTV) => (
                            <li className={'cctv'}>
                                <div className={'cctv-id'}>{item.id}</div>
                                <div className={'cctv-location'}>{item.title}</div>
                                <div className={'cctv-type'}>{item.type}</div>
                            </li>
                        ))}
                    </ul>
                </details>
                <details>
                    <summary>TIMS</summary>
                    <ul className={'incident-list'}>
                        {
                            incidents.map((item: Incident) => (
                                <li className={'incident'}>
                                    <div className={'incident-id'}>{item.id}</div>
                                    <div className={'incident-location'}>{item.title}</div>
                                    <div className={'incident-type'}>{item.type}</div>
                                </li>
                            ))
                        }
                    </ul>
                </details>
            </div>
        </li> :
        <li className={classNames(aClass, className)} onClick={toggle} {...otherProps}>
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
};

export default AlertView;
