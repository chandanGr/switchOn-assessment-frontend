import React, { useState, useEffect } from 'react';

import './index.scss';
import { IFormItem } from '../../Interfaces';


interface TableRowProps {
  title?: string;
  items: IFormItem[];
  confirmBox?: boolean;
  sticker?: string;
  onSubmitRequest?: any;
}

TableRow.prototype = {
  confirmBox: false,
}

function TableRow(props: TableRowProps) {
  const [confirmBoxClassName, setConfirmBoxClassName] = useState<any>('tablerow__confirmBox');
  const [statusClassNme, setStatusClassNme] = useState<string>();

  function onSubmitRequest(status: string) {
    if (props.confirmBox) {
      setConfirmBoxClassName('tablerow__confirmBox hide');
      setStatusClassNme(status);
      props.onSubmitRequest(status);
    }
  }

  useEffect(() => {
    props.sticker && setStatusClassNme(props.sticker)
  }, [props.sticker])

  function showSticker() {
    if (props.sticker) {
      return (
        <div className="tablerow__section__item">
          <div className="tablerow__section__item__header">Status</div>
          <div className={`tablerow__section__item__sticker sticker--${statusClassNme}`}>
            {statusClassNme}
          </div>
        </div>
      )
    }
  }

  function showConfirmBox() {
    if (props.confirmBox && props.sticker === 'Pending') {
      return (
        <div className={confirmBoxClassName}>
          <div className="tablerow__confirmBox__button" onClick={() => onSubmitRequest('APPROVED')}>
            <div className="tablerow__confirmBox__button--accept">
              Accept request
          </div>
          </div>
          <div className="tablerow__confirmBox__button" onClick={() => onSubmitRequest('REJECTED')}>
            <div className="tablerow__confirmBox__button--cancelled">
              Cancel request
          </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='tablerow'>
      <div className="tablerow__title">{props.title}</div>
      <div className='tablerow__section'>
        {
          props.items && props.items.map((item: IFormItem) => {
            if (item.label !== 'Id') {
              if (item.label !== 'Status') {
                if (item.label !== 'formId') {
                  return (
                    <div className="tablerow__section__item">
                      <div className="tablerow__section__item__header">{item.label}</div>
                      <div className="tablerow__section__item__value">{item.value}</div>
                    </div>
                  );
                }
              }
            }
          })
        }
        {showSticker()}
      </div>
      {showConfirmBox()}
    </div>
  )
}

export default TableRow;
