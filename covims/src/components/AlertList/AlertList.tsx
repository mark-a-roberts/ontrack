import React, {ChangeEvent, HTMLProps} from 'react';
import classNames from "classnames";

import Alert from '../Alert';

import './AlertList.scss';

interface AlertListProps {
    alerts?: object[]
}

interface IState {
    openItem: string;
}

type AllProps = AlertListProps & HTMLProps<HTMLUListElement>

class AlertList extends React.Component<AllProps, IState> {
    constructor(props:AllProps) {
        super(props);
        this.state = {
            openItem: ''
        }
    }

    toggleAlert = (e: ChangeEvent) => {
        e.persist();
        e.preventDefault();
        const openItem = (e.currentTarget.id === this.state.openItem) ? '' : e.currentTarget.id;
        this.setState({openItem});
    };

    render() {
        const {alerts, className} = this.props;
        const {openItem} = this.state;

        return <ul className={classNames('alert-list', className)}>
            {alerts && alerts.map((a: any) => (
                <Alert key={a.id} {...a} open={a.id === openItem} toggle={this.toggleAlert}/>))}
        </ul>;
    }
}

export default AlertList;
