import React from "react";
import {Map} from '@esri/react-arcgis';

import classNames from "classnames";
import {Alert} from "../../data/alert";

type EsriProps = {
    alerts?: Alert[]
}

type Props = EsriProps & any

type State = {}

class EsriMap extends React.Component<Props, State> {

    constructor(props: Props) {
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
        const {alerts, className, ...other} = this.props;

        return <Map
            className={classNames(className)}
            // id={'7be6d1f81ab047fda02107a97079ccd3'}
            mapProperties={{basemap: 'gray'}}
            viewProperties={{
                center: [-0.1, 51.5],
                zoom: 10
            }}
            onLoad={this.mapLoad}
            {...other}
        >
        </Map>
    }

}

export default EsriMap;
