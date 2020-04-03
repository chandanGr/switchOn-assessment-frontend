import React, { useState } from 'react';

import './index.scss';
import FormField from '../FormField';
import { IOptionData } from '../../Interfaces';

const hardCodedOptions: IOptionData[] = [
  { label: 'Science', value: 'science' },
  { label: 'Maths', value: 'maths' },
  { label: 'History', value: 'history' },
]

interface FormPopupProps {
  onClickClose: any;
  showPopupForm?: boolean;
  onSendRequest: any;
}

function FormPopup(props: FormPopupProps) {

  const [formDetails, setFormDetails] = useState<any>();

  function onChange(name: string, value: string) {
    setFormDetails((prevState: any) => ({
      ...prevState, [name]: value
    }))
  }

  return (
    <div className={props.showPopupForm ? 'formPopup shadow' : 'formPopup hide'}>
      <div className="formPopup__header">Create your Request</div>
      <FormField name='email' type="text" label='Email' placeholder='Enter your Email'
        onChange={onChange} />

      <FormField name='department' type="select" optionData={hardCodedOptions} label='Select Department'
        optionPlaceholder="Select department" onChange={onChange} />

      <FormField name='comments' type="textArea" label='Comments' textAreaRows={9}
        onChange={onChange} />
      <div className='formPopup__button' onClick={props.onSendRequest}>Send Request</div>
      <div className="formPopup__closeButton" onClick={props.onClickClose}>X</div>
    </div >
  )
}

export default FormPopup;
