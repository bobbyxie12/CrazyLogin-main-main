export interface Role {
  departmentId: number;
  department: string;
  departmentRegion: string;
  position: string;
  status: string;
  roleType: string;

  createdAt: number | null;
  createdBy: string;
}

export interface User {
  id: number | null;
  username: string;
  password?: string | null;

  groups: string[] | null;
  group: string | null;

  roles: Role[] | null;

  createdAt: number | null;

  firstName: string | null;
  lastName: string | null;
  preferredName: string | null;
  phone: string | null;
  email: string | null;
  // birthday: number | null;

  addressLine1: string | null;
  addressLine2: string | null;
  state: string | null;
  postcode: string | null;
  country: string | null;

  credit: number | null;
  active: boolean | null;

  region: string | null;
  icon: string | null;

  accesses: string[];

  isActive: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}


export interface updatePasswordData{
  newPassword: string | null;
  username: string;
  oldPassword : string | null

}
export interface updateData{
  username: string;
  oldPassword : string | null

}

export interface updateInfo{
  firstName: string | null,
  lastName: string | null,
  dob: number | null,
  email: string | null,
  phone: string | null,
  addressline1:string | null,
  addressline2:string | null,
  city: string | null,
  state:string | null,
  postcode:string | null,
  dateBox:string | null,

}