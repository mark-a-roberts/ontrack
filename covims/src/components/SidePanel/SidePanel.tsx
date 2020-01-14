import React, {HTMLProps} from 'react';
import classNames from 'classnames';

import './SidePanel.scss';

interface SidePanelProps {
}

type Props = SidePanelProps & HTMLProps<HTMLDivElement>

const SidePanel: React.FC<Props> = (props: Props) => {
    const {children, className, ...other} = props;
    return <div className={classNames('sidepanel', className)} {...other}>
        {children}
    </div>
};

export default SidePanel;
