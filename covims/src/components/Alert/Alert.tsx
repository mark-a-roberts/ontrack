import React from "react";

import './Alert.scss';

/*
    Alert
 */

interface AlertProps {
    title?: string;
    text?: string;
    time?: Date
}

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;

function timeDifference(t1: Date, t2: Date): string {
    const timeDiff = t1.getTime() - t2.getTime();
    let ds = '';
    if (timeDiff < HOUR) {
        let min = Math.floor(timeDiff / MIN);
        if (min !== 0) {
            ds = min + ' mins ago';
        } else {
            ds = Math.floor(timeDiff / SEC) + ' secs ago';
        }
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

const Alert: React.FC<AlertProps> = (props) => {
    const {title, text, time } = props;
    const now = new Date();
    return <div>
        <div className='alert'>
            <div className='alert-type'>
                New
            </div>
            <div className='alert-info'>
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
            <div className='alert-time'>
                {time ? timeDifference(now, time) : '---'}
            </div>
        </div>
        <hr/>
    </div>
};

export default Alert;
