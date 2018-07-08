export interface FaqResponse {
  data: Faq[];
}

export interface Faq {

  id: number;
  question: string;
  response:string;
}
