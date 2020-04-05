import React, { useState, useEffect } from 'react';

import './index.scss';
import FormField from '../FormField';
import { IOptionData } from '../../Interfaces';
import { CallApi } from '../../Services/CallApi';

const hardCodedOptions: IOptionData[] = [
  { label: 'Science', value: 'science' },
  { label: 'Maths', value: 'maths' },
  { label: 'History', value: 'history' },
]

interface FormPopupProps {
  onClickClose: any;
  showPopupForm?: boolean;
  onSendRequest: any;
  showMessage?: string;
  departentOptions?: IOptionData[]
}

function FormPopup(props: FormPopupProps) {

  const [formDetails, setFormDetails] = useState<any>();
  const [selectFieldDisabled, setSelectFieldDisabled] = useState(true);
  const [callApi, setCallApi] = useState<string>();
  const [userEmail, setUserEmail] = useState<any>();

  useEffect(() => {
    if (formDetails && formDetails.department) {
      CallApi('/user/department/' + callApi, 'GET')
        .then((parsedData: any) => {
          parsedData && setUserEmail(parsedData.data.map((data: any) => {
            return {
              label: data.emailId,
              value: data.emailId,
            }
          }))
          setSelectFieldDisabled(false)
        })
    }
  }, [callApi])

  function onChange(name: string, value: string) {
    setFormDetails((prevState: any) => ({
      ...prevState, [name]: value
    }))

    if (name === 'department' && value) {
      setCallApi(value);
    }
  }

  if (!props.departentOptions) {
    return (
      <p>loading</p>
    )
  }

  return (
    <div className={props.showPopupForm ? 'formPopup shadow' : 'formPopup hide'}>
      <div className="formPopup__header">Create your Request</div>
      {props.showMessage ? <div className="formPopup__header__formMsg">{props.showMessage}</div> : null}
      <FormField name='department' type="select" optionData={props.departentOptions} label='Select Department'
        optionPlaceholder="Select department" onChange={onChange} />

      <FormField name='email' type="select" optionData={userEmail} label='Enter your Email'
        optionPlaceholder="Enter your Email" onChange={onChange} selectFieldDisabled={selectFieldDisabled} />

      <FormField name='comments' type="textArea" label='Comments' textAreaRows={9}
        onChange={onChange} />
      <div className='formPopup__button' onClick={() => props.onSendRequest(formDetails)}>Send Request</div>
      <div className="formPopup__closeButton" onClick={props.onClickClose}>X</div>
    </div >
  )
}

export default FormPopup;
