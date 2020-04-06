import React, { useEffect, useState } from 'react';
import Toolbar from '../../Components/Toolbar';
import InfoSection from '../../Components/InfoSection';

import './index.scss';
import Table from '../../Components/Table';
import { CallApi } from '../../Services/CallApi';
import DashBoardTabLoader from '../../Components/DashBoardTabLoader';

function HomePage() {
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const token = sessionStorage.getItem('userDetailId');
    token && setUserInfo(JSON.parse(token))
    token && CallApi('/user/' + JSON.parse(token), 'GET')
      .then((parsedData: any) => {
        setUserInfo(parsedData)
      })
  }, [])

  if (!userInfo) {
    return <DashBoardTabLoader />
  }

  if (!userInfo.data) {
    return <p className="Loading"></p>
  }

  return (
    <div className='homePage'>
      <Toolbar />
      {/* <Sidebar /> */}
      <InfoSection userDetail={userInfo.data} />
      <Table userDetail={userInfo.data} />
    </div>
  )
}

export default HomePage;
