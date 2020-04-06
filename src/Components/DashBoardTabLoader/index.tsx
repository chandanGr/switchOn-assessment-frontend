import React from 'react';

import './index.scss';

function DashBoardTabLoader() {
  return (
    <div className='dashboard-tab-loader-container'>
      <div className='lds-ripple'><div></div><div></div></div>
      <div className='loader-text'>Loading...</div>
    </div>
  );
}

export default DashBoardTabLoader;
