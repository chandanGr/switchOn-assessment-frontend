import React, { useEffect, useState } from 'react'

import Toolbar from '../../Components/Toolbar';
import InfoSection from '../../Components/InfoSection';

import './index.scss';
import { IUserDetail } from '../../Interfaces';
import FormDetail from '../../Components/FormDetail';
import Sidebar from '../../Components/Sidebar';

function HomePage() {
  const [userInfo, setUserInfo] = useState<IUserDetail>();

  useEffect(() => {
    const userDetail = localStorage.getItem('userDetails');
    userDetail && setUserInfo(JSON.parse(userDetail))
  }, [])

  console.log('the user info is ', userInfo)
  if (!userInfo) {
    return <p>Loading....</p>
  }
  return (
    <div className='homePage'>
      <Toolbar />
      <Sidebar />
      <InfoSection userDetail={userInfo} />
      <FormDetail />
    </div>
  )
}

export default HomePage;
