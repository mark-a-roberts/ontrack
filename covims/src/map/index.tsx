import './mark';
import GoogleMapReact from "google-map-react";
import Marker from "./mark";
import React from "react";
import {IAlert} from "../reducers/alerts";

const colors:any = {
    broken: 'turquoise',
    hazard: 'red',
    collision: 'green',
    lights: 'blue',
    closure: 'yellow',
    traffic: 'white'
}

function Map(props:any) {
    return <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCTQDk2x-ZzaBAGcLKsY5TQPM08G_o6x2I' }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
    >
        {props.alerts && props.alerts.map((a:IAlert) => (
            <Marker key={a.id} lat={a.lat} lng={a.lng} name={a.title} color={colors[a.type] || 'orange'} />
        ))}
    </GoogleMapReact>
}

export default Map;
