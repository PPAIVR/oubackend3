export interface ServiceResponse {
  data: Service[];
}

export interface Service {

  id: number;
  points: number;
  images:ServiceImage[];
  description:string;
  name: string;
  lang: ServiceLang;

}

export interface ServiceImage {
  url:string;
  service_id:number;
}

export interface ServiceLang {
  name:string;
  description:string;
}
