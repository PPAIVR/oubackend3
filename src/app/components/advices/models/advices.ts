export interface AdviceResponse {
  data: Advice[];
}

export interface Advice {
  id: number;
  question: string;
  response: string;
  lang_id: number;
  title: string;
  commentlangs: AdviceLang[];
}

export interface AdviceLang {
  question: string;
  response: string;
  lang_id: number;
}
