import React, { useState, useEffect } from 'react'
import TableRow from '../TableRow';
import { IFormItem, ILabelValue } from '../../Interfaces';
import CustomErrorPage from '../CustomErroPage';

import erroImage from '../../Assets/Images/no-data.svg';
import { CallApi } from '../../Services/CallApi';

// const hardCodedItems: IFormItem[] = [
//   { header: 'header1', value: 'value1' },
//   { header: 'header1', value: 'value1' },
//   { header: 'header1', value: 'value1' },
//   { header: 'header1', value: 'value1' },
//   { header: 'header1', value: 'value1' },
// ]

const tabs: ILabelValue[] = [
  { label: 'Department Requests', value: 'departmentForms' },
  { label: 'Requested Forms', value: 'requestedForms' },
  { label: 'Recieved Forms', value: 'recieved Forms' },

]

interface TableProps {
  userDetail?: any
}

function reverseArray(arr: any) {
  var newArray = [];
  for (var i = arr.length - 1; i >= 0; i--) {
    newArray.push(arr[i]);
  }
  return newArray;
}

function Table(props: TableProps) {
  const [userSelectedTabIndex, setUserSelectedTabIndex] = useState<number>(0);
  const [requestedForms, setRequestedForms] = useState<any>([]);
  const [departmentForms, setDepartmentForms] = useState<any>([]);
  const [recievedForms, setRecievedForms] = useState<any>([]);
  const [showConfirmBox, setShowConfirmBox] = useState(true)

  const ERROR_PAGE_MAIN_MSG = 'Sorry!';
  const ERROR_PAGE_SUB_MSG = 'No data found';


  useEffect(() => {
    setDepartmentForms(getRowItems(props.userDetail.departmentForms));
  }, [])

  function onSubmitRequest(status: string, rowdata: any) {
    const requestData = {
      id: rowdata[7].value,
      status: status,
      assignedToDepartment: rowdata[4].value,
      createdBy: rowdata[0].value,
      assignedTo: rowdata[2].value,
      createdByDepartment: rowdata[1].value,
      formId: rowdata[6].value
    }
    CallApi('/form/update', 'POST', requestData)
      .then((reponse: any) => {
      })
  }

  function onTabClick(tab: ILabelValue, index: number) {
    setUserSelectedTabIndex(index);
    if (index === 0) {
      setDepartmentForms(getRowItems(props.userDetail.departmentForms));
    } else if (index === 1) {
      setRequestedForms(getRowItems(props.userDetail.requestedForms));
    }
    else {
      setRecievedForms(getRowItems(props.userDetail.recievedForms));
    }

  }

  function getTabClassName(index: number) {
    return userSelectedTabIndex === index ? 'table__tabSection__tabs--active shadow'
      : 'table__tabSection__tabs';
  }

  function getRowItems(rowData: any) {
    const tempRow: any = [];
    rowData && rowData.map((data: any) => {
      const row = [
        { label: 'Requested From', value: data.createdBy },
        { label: 'From Department', value: data.createdByDepartment },
        { label: 'Requested To', value: data.assignedTo },
        { label: 'Description', value: data.description },
        { label: 'To Department', value: data.assignedToDepartment },
        { label: 'Status', value: data.status },
        { label: 'formId', value: data.formId },
        { label: 'Id', value: data._id },
      ]
      tempRow.push(row);
    })
    return tempRow;
  }

  function getTableRows() {
    let data: any;
    if (userSelectedTabIndex === 0) {
      data = reverseArray(departmentForms)
    } else if (userSelectedTabIndex === 1) {
      data = reverseArray(requestedForms);
    } else {
      data = reverseArray(recievedForms);
    }

    if (data && data.length === 0) {
      return (
        <CustomErrorPage mainText={ERROR_PAGE_MAIN_MSG} subText={ERROR_PAGE_SUB_MSG}
          errorImage={erroImage}
        />
      )
    } else {
      return data && data.map((rowdata: any) => {
        const showConfirmBox = userSelectedTabIndex === 2 ? true : false
        return (
          <TableRow title={rowdata[6].value} items={rowdata}
            confirmBox={showConfirmBox} sticker={rowdata[5].value}
            onSubmitRequest={(status: string) => onSubmitRequest(status, rowdata)}
          />
        )
      })
    }
  }

  return (
    <div className="table">
      <div className="table__title">Forms in this Department: </div>
      <div className="table__tabSection">
        {
          tabs && tabs.map((tab: ILabelValue, index: number) => {
            return (
              <div className={getTabClassName(index)} onClick={() => onTabClick(tab, index)}>
                {tab.label}
              </div>
            )
          })
        }
      </div>

      <div className="table__wrapper shadow">
        {getTableRows()}
      </div>
    </div>
  )
}

export default Table;
