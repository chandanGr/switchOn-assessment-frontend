import React, { useState } from 'react';

import './index.scss';

const hardCodedSidebarlists = [
  { iconName: 'Home', active: true },
  { iconName: 'Pending', active: false },
  { iconName: 'Approved', active: false },
  { iconName: 'Rejected', active: false },
]
function Sidebar() {
  const [sidebarLists, setSidebarLists] = useState(hardCodedSidebarlists)

  function getIconClassName(sidebarlist: any) {
    if (sidebarlist.active) {
      return 'sidebar__icon icon--active'
    } else {
      return 'sidebar__icon';
    }
  }

  function onClickSidebarIcon(key: number) {
    const temp = JSON.parse(JSON.stringify(sidebarLists));
    temp.map((sidebarlist: any, index: number) => {
      if (index === key) {
        sidebarlist.active = true;
      } else {
        sidebarlist.active = false;
      }
    })
    setSidebarLists(temp);
  }

  return (
    <div className="sidebar shadow">
      {sidebarLists && sidebarLists.map((sidebarlist: any, index: number) => {
        return (
          <div className={getIconClassName(sidebarlist)} onClick={() => onClickSidebarIcon(index)}>
            {sidebarlist.iconName}
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar;
