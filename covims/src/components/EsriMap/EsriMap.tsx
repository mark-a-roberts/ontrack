import React from "react";
import {Map} from '@esri/react-arcgis';

import classNames from "classnames";
import {Alert} from "../../data/alert";

type AllProps = {
    alerts?: Alert[]
    className?: string
}

type AllState = {}

class EsriMap extends React.Component<AllProps, AllState> {

    constructor(props: AllProps) {
        super(props);
        this.state = {
            map: null,
            view: null
        };
        this.mapLoad = this.mapLoad.bind(this)
    }

    mapLoad(map: any, view: any) {
        this.setState({map, view});
    }

    render() {
        const {alerts, className, ...otherProps} = this.props;

        return <Map
            className={classNames(className)}
            // id={'7be6d1f81ab047fda02107a97079ccd3'}
            mapProperties={{basemap: 'gray'}}
            viewProperties={{
                center: [-0.1, 51.5],
                zoom: 10
            }}
            onLoad={this.mapLoad}
            {...otherProps}
        >
        </Map>
    }

};

export default EsriMap;
