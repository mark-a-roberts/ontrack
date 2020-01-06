import React from 'react';
import GoogleMapReact from "google-map-react";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {
    faCarCrash,
    faCarSide,
    faSmog,
    faTimesCircle,
    faTrafficLight,
    faTruckPickup,
    faCamera,
    faExclamation
} from "@fortawesome/free-solid-svg-icons";


import Marker from "./mark";
import classNames from "classnames";
import {Incident} from "../../data/incident";
import {Alert} from "../../data/alert";
import {CCTV} from "../../data/cctv";

interface AlertMap {
    color: string;
    icon: string;
}

const alert: any = {
    broken: {color: 'white', icon: faTruckPickup},
    hazard: {color: 'white', icon: faSmog},
    collision: {color: 'white', icon: faCarCrash},
    lights: {color: 'white', icon: faTrafficLight},
    closure: {color: 'white', icon: faTimesCircle},
    traffic: {color: 'white', icon: faCarSide}
};

interface MapProps {
    alerts?: Alert[],
    cctv?: CCTV[],
    incidents?: Incident[]
}

const Map = (props: MapProps & any ) => {
    const {alerts, cctv, incidents, className, draggable, ...otherProps} = props;

    return <GoogleMapReact className={classNames(className)}
        bootstrapURLKeys={{key: 'AIzaSyCTQDk2x-ZzaBAGcLKsY5TQPM08G_o6x2I'}}
        {...otherProps}
    >
        {alerts && alerts.map((a: Alert) => (
            <Marker key={a.id} lat={a.lat} lng={a.lng} name={a.title} color={alert[a.type].color || 'orange'}>
                <Icon className='marker-icon' icon={alert[a.type].icon}/>
            </Marker>
        ))}
        {cctv && cctv.map((item: CCTV) => (
            <Marker key={item.id} lat={item.lat} lng={item.lon} name={item.commonName} color={ 'white'}>
                <Icon className='marker-icon' icon={faCamera}/>
            </Marker>
        ))}
        {incidents && incidents.map((item: Incident) => (
            <Marker key={item.id} lat={item.lat} lng={item.lon} name={item.location} color={ 'white'}>
                <Icon className='marker-icon' icon={faExclamation}/>
            </Marker>
        ))}
    </GoogleMapReact>
};

export default Map;
