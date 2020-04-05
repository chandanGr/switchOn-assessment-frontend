import React, { useState, useEffect } from 'react';

import { IUserDetail, IOptionData } from '../../Interfaces';
import FormPopup from '../FormPopup';
import { CallApi } from '../../Services/CallApi';

interface InfoSectionProps {
  userDetail: IUserDetail;
}

function InfoSection(props: InfoSectionProps) {
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [showMessage, setShowMessage] = useState('')
  const [departentOptions, setDepartentOptions] = useState<IOptionData[]>([])

  useEffect(() => {
    const departmentOptions: IOptionData[] = [
      { label: 'Maths', value: 'maths' },
      { label: 'History', value: 'history' },
      { label: 'Chemistry', value: 'chemistry' },
      { label: 'Biology', value: 'biology' },
      { label: 'Physics', value: 'physics' },
      { label: 'Science', value: 'science' },
    ];
    const tempDepartmentOptions: IOptionData[] = [];
    departmentOptions.map((department: IOptionData) => {
      if (department.value.toLowerCase() !== props.userDetail.department.toLowerCase()) {
        tempDepartmentOptions.push(department)
      }

    })
    setDepartentOptions(tempDepartmentOptions);
  }, [])

  function createForm() {
    setShowPopupForm(!showPopupForm);
  }
  function onClickClose() {
    setShowPopupForm(!showPopupForm);
  }
  function onSendRequest(formDetails: any) {
    if (!formDetails || !formDetails.comments || !formDetails.department || !formDetails.email) {
      setShowMessage('Fill all details');
      return;
    }
    const formRequest = {
      userName: props.userDetail.firstName,
      description: formDetails.comments,
      status: "Pending",
      assignedToDepartment: formDetails.department,
      createdBy: props.userDetail.emailId,
      assignedTo: formDetails.email,
      createdByDepartment: props.userDetail.department,
    }
    CallApi('/form/', 'POST', formRequest)
      .then((parsedData: any) => {
        if (!parsedData.isError) {
          setShowMessage('Request sent successfully')
          setTimeout(() => { setShowPopupForm(!showPopupForm); }, 1000)
        } else {
          setShowMessage('Error occured')
        }
      })
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
      <FormPopup showPopupForm={showPopupForm} onClickClose={onClickClose}
        onSendRequest={onSendRequest} showMessage={showMessage} departentOptions={departentOptions} />
    </div>
  )
}

export default InfoSection;
