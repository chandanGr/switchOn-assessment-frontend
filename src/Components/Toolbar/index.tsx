import React from 'react';

function Toolbar() {
  return (
    <div className="toolbar shadow">
      <div className="toolbar__logo">
        <img src="https://switchon.io/img/website_logo.png" alt="" />
      </div>
      <div className="toolbar__logout">
        Logout
      </div>
    </div>
  )
}

export default Toolbar;
