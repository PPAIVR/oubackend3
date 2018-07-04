

export interface  Employee {
  id: number;
  username: string;
  password: string;
  email: string;
  employee_level: number;
  authtoken: string;
  created_at: string;
}

export interface EmployeeResponse {
  message: boolean;
  data: Employee[];
  code: number;
  total: number;
}



