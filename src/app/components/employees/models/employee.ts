

export interface  Employee {
  id: number;
  username: string;
  password: string;
  email: string;
  employee_level: number;
  authtoken: string;
  total: number;
}

export interface EmployeeResponse {
  message: boolean;
  data: Employee[];
  code: number;
  total: number;
}



