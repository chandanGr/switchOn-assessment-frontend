import React from 'react';
import { Input, Select } from 'antd';


import { IOptionData } from '../../Interfaces';

import './index.scss';

const { Option } = Select;
const { TextArea } = Input;

interface FormFieldProps {
  label?: string;
  type: 'text' | 'password' | 'select' | 'textArea';
  textAreaRows?: number;
  onChange: any;
  placeholder?: string;
  name: string;
  errorMessage?: string;
  optionData?: IOptionData[];
  optionPlaceholder?: string;
  selectFieldDisabled?: boolean
}

function FormField(props: FormFieldProps) {


  if (props.type === 'select') {
    return (
      <div className={`field field--${props.name}`}>
        <div className={`field__label label--${props.name}`}>
          {props.label} <span className='field__label__astrek'>*</span>
        </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={props.optionPlaceholder}
          optionFilterProp="children"
          onChange={(value: any, option: any) => props.onChange(props.name, value)}
          disabled={props.selectFieldDisabled}
        >
          {
            props.optionData && props.optionData.map((data: IOptionData) => {
              return <Option value={data.value}>{data.label}</Option>
            })
          }
        </Select>
      </div>
    )
  } else if (props.type === 'textArea') {
    return (
      <div className={`field field--${props.name}`}>
        <div className={`field__label label--${props.name}`}>
          {props.label} <span className='field__label__astrek'>*</span>
        </div>
        <TextArea rows={props.textAreaRows}
          onChange={(e: any) => props.onChange(props.name, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div className={`field field--${props.name}`}>
      <div className={`field__label label--${props.name}`}>
        {props.label} <span className='field__label__astrek'>*</span>
      </div>
      <Input placeholder={props.placeholder} type={props.type} name={props.name}
        onChange={(e: any) => props.onChange(props.name, e.target.value)} />
      {
        props.errorMessage ? <div className="field__errorMessage">
          {props.errorMessage}
        </div>
          : null}
    </div>
  )
}

export default FormField;
