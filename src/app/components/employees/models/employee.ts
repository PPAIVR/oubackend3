

export interface  Employee {
  id: number;
  username: string;
  password: string;
  email: string;
  employee_level: number;
  authtoken: string;
}

export interface EmployeeResponse {
  message: boolean;
  data: Employee[];
  code: number;
}

