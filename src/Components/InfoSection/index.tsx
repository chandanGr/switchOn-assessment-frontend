import React, { useState } from 'react';

import { IUserDetail } from '../../Interfaces';
import FormPopup from '../FormPopup';

interface InfoSectionProps {
  userDetail: IUserDetail;
}

function InfoSection(props: InfoSectionProps) {
  const [showPopupForm, setShowPopupForm] = useState(false);

  function createForm() {
    setShowPopupForm(!showPopupForm);
  }
  function onClickClose() {
    setShowPopupForm(!showPopupForm);
  }
  function onSendRequest() {
    setShowPopupForm(!showPopupForm);
  }

  return (
    <div className="infoSection">
      <div className="infoSection__userinfo">
        <p className='infoSection__userinfo__header'>
          <span className='infoSection__userinfo__header__label--hi'>Hi </span>
          <span className='infoSection__userinfo__header__label--name'> {props.userDetail.firstName}</span>
          <div className="infoSection__button shadow" onClick={createForm}>
            Create Form
          </div>
        </p>
        <p className='infoSection__userinfo__subtitle'>{props.userDetail.department} Department</p>
      </div>
      <div className="infoSection__img">
        <img src="https://d3n32ilufxuvd1.cloudfront.net/5c8792f4cdf6a301a044dfab/1433684/upload-0c8526b7-5f57-4efd-b350-6806c4d7a226.png" alt="" />
      </div>
      <div className={showPopupForm ? "infoSection__formContainer darkbackground" : 'infoSection__formContainer'} />
      <FormPopup showPopupForm={showPopupForm} onClickClose={onClickClose} onSendRequest={onSendRequest} />
    </div>
  )
}

export default InfoSection;
