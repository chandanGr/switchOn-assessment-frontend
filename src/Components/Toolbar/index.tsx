import React from 'react';
import { withRouter } from 'react-router-dom';


function Toolbar(props: any) {

  function onLogOut() {
    sessionStorage.clear();
    props.history.push('/login')
  }

  return (
    <div className="toolbar shadow">
      <div className="toolbar__logo">
        <img src="https://switchon.io/img/website_logo.png" alt="" />
      </div>
      <div className="toolbar__logout" onClick={onLogOut}>
        Logout
      </div>
    </div>
  )
}

export default withRouter(Toolbar);
