import React, {ChangeEvent, HTMLProps} from 'react';
import classNames from "classnames";

import Alert from '../Alert';

import './AlertList.scss';

interface AlertListProps {
    alerts?: object[]
}

interface IState {
    openItem: any;
}

type AllProps = AlertListProps & HTMLProps<HTMLUListElement>

class AlertList extends React.Component<AllProps, IState> {
    constructor(props: AllProps) {
        super(props);
        this.state = {
            openItem: ''
        }
    }

    toggleAlert = (e: ChangeEvent) => {
        e.persist();
        e.preventDefault();
        const openId = e.currentTarget.getAttribute('data-id');
        const openItem = (openId === this.state.openItem) ? '' : openId;
        this.setState({openItem});
    };

    render() {
        const {alerts, className} = this.props;
        const {openItem} = this.state;

        return <ul className={classNames('alert-list', className)}>
            {alerts && alerts.map((a: any) => (
                <Alert key={a.id} alertId={a.id} open={a.id === openItem} toggle={this.toggleAlert}/>))}
        </ul>;
    }
}

export default AlertList;
