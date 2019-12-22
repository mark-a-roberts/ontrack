import React, {ChangeEvent, HTMLProps} from "react";
import classNames from "classnames";

import Alert from '../Alert';

import './AlertList.scss';

interface AlertListProps {
    alerts?: object[]
}

interface IState {
}

class AlertList extends React.Component<AlertListProps & HTMLProps<HTMLDivElement>, IState> {

    doChange = (e: ChangeEvent) => {
        e.persist();
        console.log(e)
    };

    render() {
        const {alerts, className} = this.props;
        return <div className={classNames('alert-list', className)}>
            {alerts && alerts.map((a: any) => (
                <Alert key={a.id} {...a} />))}
        </div>;
    }
}

export default AlertList;
