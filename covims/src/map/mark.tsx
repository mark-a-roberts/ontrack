import React from 'react';
import './marker.scss';

const Marker = (props: any) => {
    const { color, name, id } = props;
    return (
        <div className="marker" id={id}
             style={{ backgroundColor: color, cursor: 'pointer'}}
             title={name}
        />
    );

};

export default Marker;
