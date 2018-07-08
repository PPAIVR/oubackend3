export interface AdviceResponse {
  data: Advice[];
}

export interface Advice {
  id: number;
  question: string;
  response:string;
}
