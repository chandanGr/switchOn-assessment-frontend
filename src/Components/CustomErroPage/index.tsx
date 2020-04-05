import React from 'react';
import './index.scss';

interface CustomErrorPageProps {
  mainText?: string;
  subText?: string;
  errorImage?: any;
}

function CustomErrorPage(props: CustomErrorPageProps) {
  return (
    <div className='empty-data-error-page'>
      <img className='empty-data-img' src={props.errorImage} />
      <p className='empty-data-header-msg'>{props.mainText}</p>
      <p className='empty-data-error-message'>{props.subText}</p>
    </div>
  );
}

export default CustomErrorPage;
