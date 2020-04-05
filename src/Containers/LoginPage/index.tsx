import React, { useState } from 'react';

import './index.scss';

import FormField from '../../Components/FormField';
import { IOptionData } from '../../Interfaces';
import { CallApi, setHeaders } from '../../Services/CallApi';

import { withRouter } from 'react-router-dom';
import { emailValdation, validatePassword } from './Utilities';
import DashBoardTabLoader from '../../Components/DashBoardTabLoader';

export declare const IValidation: ["ALL_FIELDS", "EMAIL", "PASSWORD_MISMATCH", 'NO_ERROR'];

const hardCodedOptions: IOptionData[] = [
  { label: 'Maths', value: 'maths' },
  { label: 'History', value: 'history' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Biology', value: 'biology' },
  { label: 'Physics', value: 'physics' },
  { label: 'Science', value: 'science' },
];

function LoginPage(props: any) {
  const [registerFormSelected, setRegisterFormSelected] = useState<boolean>(false)
  const [formDetails, setFormDetails] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loader, setLoader] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string>();

  function onChange(name: string, value: string) {
    setFormDetails((prevState: any) => ({
      ...prevState, [name]: value
    }))
  }

  function validateRegistration(userDetails: any) {
    let validation = '';
    userDetails && Object.keys(userDetails).forEach((key: any) => {
      if (!userDetails[key]) {
        validation = 'ALL_FIELDS';
      }
    })
    if (validation === 'ALL_FIELDS') {
      setErrorMessage('All Fields must be filled')
      return false;
    } else if (validation === 'EMAIL') {
      setErrorMessage('Email must be in proper format')
      return false;
    } else if (validation === 'PASSWORD_MISMATCH') {
      setErrorMessage('Both passowrd must match')
      return false;
    } else {
      if (!emailValdation(userDetails.emailId)) {
        setErrorMessage('Email Must be in proper format')
        return false
      } else {
        if (!validatePassword(userDetails.password, userDetails.confirmPassword)) {
          setErrorMessage('Both Passowrds must be same')
          return false;
        } else {
          return true;
        }
      }
    }
  }

  function onSubmit() {
    if (registerFormSelected) {
      const userDetail: any = {
        firstName: formDetails.firstname,
        emailId: formDetails.email,
        password: formDetails.password,
        department: formDetails.department,
        confirmPassword: formDetails.confirmPassword,
        requestedForms: [],
        departmentForms: [],
        recievedForms: [],
      }

      if (validateRegistration(userDetail)) {
        setLoader(true);
        CallApi('/user', 'POST', userDetail)
          .then((parsedData: any) => {
            setLoader(false)
            setRegisterFormSelected(!registerFormSelected);
            setErrorMessage('');
            setSuccessMsg('User registered successfully')
            setTimeout(() => { setSuccessMsg('') }, 1000)
          })
      }

    } else {
      const userDetail: any = {
        emailId: formDetails.email,
        password: formDetails.password,
      }
      setLoader(true);
      CallApi('/auth/', 'POST', userDetail)
        .then((parsedData: any) => {
          setLoader(false)
          if (parsedData.isError || parsedData.message === 'Invalid EmailId or password') {
            setErrorMessage('Invalid EmailId or password')
          } else {
            sessionStorage.setItem('userDetailId', JSON.stringify(parsedData.id));
            props.history.push('/home');
          }
        })
    }
  }

  if (loader) {
    return (
      <DashBoardTabLoader />
    )
  }

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
          {successMsg ?
            <div className="loginPage__loginContainer__form--signIn__successMsg">
              {successMsg}
            </div> : null
          }
          {errorMessage ?
            <div className="loginPage__loginContainer__form--signIn__errorMessage">
              {errorMessage}
            </div> : null
          }
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
            onClick={() => { setRegisterFormSelected(!registerFormSelected); setErrorMessage(''); }}
          >
            {registerFormSelected ? 'Have an account? Then Login here.' : 'Dont have an account? Then Register here.'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);
