import React, { useState } from 'react';

import './index.scss';

import FormField from '../../Components/FormField';
import { IOptionData } from '../../Interfaces';
import { CallApi, setHeaders } from '../../Services/CallApi';

import { withRouter } from 'react-router-dom';


const hardCodedOptions: IOptionData[] = [
  { label: 'Science', value: 'science' },
  { label: 'Maths', value: 'maths' },
  { label: 'History', value: 'history' },
]

function LoginPage(props: any) {
  const [registerFormSelected, setRegisterFormSelected] = useState<boolean>(false)
  const [formDetails, setFormDetails] = useState<any>();
  let [fieldErrorMsg, setFieldErrorMsg] = useState<any>();

  function onChange(name: string, value: string) {
    setFormDetails((prevState: any) => ({
      ...prevState, [name]: value
    }))
  }

  console.log('fieldErrorMsg', fieldErrorMsg, 'formDetails', formDetails)

  function onSubmit() {
    setFieldErrorMsg({});
    if (registerFormSelected) {
      const userDetail: any = {
        firstName: formDetails.firstname,
        emailId: formDetails.email,
        password: formDetails.password,
        department: formDetails.department,
      }
      CallApi('http://localhost:5000/user/', 'POST', userDetail)
        .then((parsedData: any) => {
          console.log('the parsed data i s', parsedData)
        })
    } else {
      const userDetail: any = {
        emailId: formDetails.email,
        password: formDetails.password,
      }
      CallApi('http://localhost:5000/auth/', 'POST', userDetail)
        .then((parsedData: any) => {
          localStorage.setItem('userDetails', JSON.stringify(parsedData));
          props.history.push('/home');
        })
    }
  }

  console.log('fieldErrorMsg', fieldErrorMsg)

  return (
    <div className="loginPage">
      <div className="loginPage__image">
        <img src="https://switchon.io/images/landing-01-02.svg" alt="" />
      </div>
      <div className="loginPage__loginContainer">
        <div className="loginPage__loginContainer__form--signIn">

          {/* login header */}
          <div className="loginPage__loginContainer__form--signIn__header">
            {registerFormSelected ? 'Register to Switchon Assignment' : 'Login to Switchon Assignment'}
          </div>

          {/* login fields */}
          {registerFormSelected ?
            <FormField name='firstname' type="text" label='First Name' placeholder='Enter your Firstname'
              onChange={onChange} /> : null}
          <FormField name='email' type="text" label='Email' placeholder='Enter your Email'
            onChange={onChange} />
          {registerFormSelected ?
            <FormField name='department' type="select" optionData={hardCodedOptions} label='Select Department'
              optionPlaceholder="Select any department" onChange={onChange} /> : null
          }
          <FormField name='password' type="password" label='Password' placeholder='Enter your Password'
            onChange={onChange} />
          {registerFormSelected ?
            <FormField name='confirmPassword' type="password"
              label='Confirm Password' placeholder='Re Enter your Password' onChange={onChange} /> : null}

          {/* login button */}
          <div className='loginPage__loginContainer__form--signIn__submitButton' onClick={onSubmit}>
            {registerFormSelected ? 'Register' : 'Login'}
          </div>

          <div className="loginPage__loginContainer__form--signIn__goToRegisterForm"
            onClick={() => { setRegisterFormSelected(!registerFormSelected) }}
          >
            {registerFormSelected ? 'Have an account? Then Login here.' : 'Dont have an account? Then Register here.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
