import React from "react";
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

import {IAlert} from "../../reducers/alerts";

import Marker from "./mark";

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
    return <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCTQDk2x-ZzaBAGcLKsY5TQPM08G_o6x2I' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
    >
        {props.alerts && props.alerts.map((a:IAlert) => (
            <Marker key={a.id} lat={a.lat} lng={a.lng} name={a.title} color={alert[a.type].color || 'orange'}>
                <Icon className='marker-icon' icon={alert[a.type].icon}/>
            </Marker>
        ))}
    </GoogleMapReact>
}

export default Map;
