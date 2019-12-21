import React from 'react';
import classNames from 'classnames';

import './SidePanel.scss';

interface SidePanelProps {

}

const SidePanel: React.FC<SidePanelProps> = (props) => {
    const { children} = props;
    return <div className={classNames('sidepanel')}>
        {children}
    </div>
};

export default SidePanel;
