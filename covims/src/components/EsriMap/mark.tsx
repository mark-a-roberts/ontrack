import React, {HTMLProps} from 'react';
import './marker.scss';

interface MarkerProps {
    id?: string,
    name?: string,
    color: string,
    lat: number | undefined,
    lng: number | undefined
}

type Props = MarkerProps & HTMLProps<HTMLDivElement>

const Marker: React.FC<Props> = (props: Props) => {
    const {color, name, id, children} = props;
    return (
        <div className="marker" id={id}
             style={{backgroundColor: color, cursor: 'pointer'}}
             title={name}
        >{children}</div>
    );

};

export default Marker;
