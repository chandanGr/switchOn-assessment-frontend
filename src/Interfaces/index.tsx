export interface IOptionData {
  label: string;
  value: string;
}

export interface IUserDetail {
  id: string,
  firstName: string,
  emailId: string,
  department: string,
  token: string,
}

export interface IFormItem {
  label?: string;
  value?: string;
  sticker?: string;
  confirmBox?: boolean;
}

export interface ILabelValue {
  label: string;
  value: string;
  active?: string;
}