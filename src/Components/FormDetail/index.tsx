import React from 'react'
import FormSets from '../FormSets';

function FormDetail() {
  return (
    <div className="formDetail">
      <div className="formDetail__title">Forms in this Department: </div>
      <FormSets />
      <FormSets />
      <FormSets />
      <FormSets />
      <FormSets />
      <FormSets />
    </div>
  )
}

export default FormDetail;
