import React from 'react';

import './index.scss';

function FormSets() {
  return (
    <div className='formset'>
      <div className="formset__title">test@test.in</div>
      <div className="formset__item">
        <div className="formset__item__header">Department</div>
        <div className="formset__item__value">Science</div>
      </div>
      <div className="formset__item">
        <div className="formset__item__header">Comment</div>
        <div className="formset__item__value">this is the comment</div>
      </div>
      <div className="formset__item">
        <div className="formset__item__header">Name</div>
        <div className="formset__item__value">John Jill</div>
      </div>
    </div>
  )
}

export default FormSets;
