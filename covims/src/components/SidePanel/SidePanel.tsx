import React, {HTMLProps} from 'react';
import classNames from 'classnames';

import './SidePanel.scss';

interface SidePanelProps {

}

const SidePanel: React.FC<SidePanelProps & HTMLProps<HTMLDivElement>> = (props) => {
    const {children, className} = props;
    return <div className={classNames('sidepanel', className)}>
        {children}
    </div>
};

export default SidePanel;
