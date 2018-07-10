export interface FaqResponse {
  data: Faq[];
}

export interface Faq {

  id: number;
  question: string;
  response:string;
  lang_id: number;
  title: string;
  faqlangs: FaqLang[];
}

export interface FaqLang {
  question: string;
  response: string;
  lang_id: number;
}
