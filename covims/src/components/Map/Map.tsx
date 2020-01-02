import React from 'react'
import GoogleMapReact from "google-map-react";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCarCrash,
    faCarSide,
    faSmog,
    faTimesCircle,
    faTrafficLight,
    faTruckPickup
} from "@fortawesome/free-solid-svg-icons";

import {Alert} from "../../data/alert";

import Marker from "./mark";
import classNames from "classnames";

interface AlertMap {
    color: string;
    icon: string;
}

const alert:any = {
    broken: { color: 'white', icon: faTruckPickup},
    hazard: { color: 'white', icon: faSmog },
    collision: { color: 'white', icon: faCarCrash},
    lights: {color: 'white', icon: faTrafficLight },
    closure: { color: 'white', icon: faTimesCircle},
    traffic: { color: 'white', icon: faCarSide}
}

const Map = (props:any) => {
    const { alerts, className, ...otherProps } = props;

    return <GoogleMapReact
        className={classNames(className)}
        bootstrapURLKeys={{ key: 'AIzaSyCTQDk2x-ZzaBAGcLKsY5TQPM08G_o6x2I' }}
        {...otherProps}
    >
        {alerts && alerts.map((a:Alert) => (
            <Marker key={a.id} lat={a.lat} lng={a.lng} name={a.title} color={alert[a.type].color || 'orange'}>
                <Icon className='marker-icon' icon={alert[a.type].icon}/>
            </Marker>
        ))}
    </GoogleMapReact>
};

export default Map;
